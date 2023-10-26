import { useParams, useNavigate } from "react-router-dom";

import {
  ResourceSchema,
  Resource,
  useGetOneResource,
  useAddOneResource,
  useUpdateOneResource,
} from "../data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@src/components/ui/button";
import {
  Form as UIForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { FormLoader } from "@src/components/loaders";

import { useToast } from "@src/components/toast/use-toast";
import {
  setServerValidationError,
  getGenericToastMessage,
} from "@src/utils/common";

interface FormProps {
  type: "create" | "update";
}

const Form = ({ type }: FormProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // fetch data if update form
  const { data: fetchedData } = useGetOneResource(id || "");

  // form
  const form = useForm<Resource>({
    resolver: zodResolver(ResourceSchema),
    values: fetchedData,
  });

  // mutation
  const addFn = useAddOneResource();
  const updateFn = useUpdateOneResource(id || "");

  const onSubmit = (newData: Resource) => {
    const mutateFn = type === "create" ? addFn : updateFn;

    mutateFn.mutate(newData, {
      onSuccess: () => {
        toast({
          description: "Saved successfully",
        });
        navigate("/resources");
      },
      onError: (error) => {
        if (!setServerValidationError(error, form.setError)) {
          toast({
            variant: "destructive",
            description: getGenericToastMessage("error"),
          });
        }
      },
    });
  };

  if (type === "create" || (type === "update" && !!id && fetchedData)) {
    return (
      <article className="p-container flex h-full flex-col gap-y-6">
        <header>
          <h3 className="text-lg font-semibold">
            {type === "create" ? "New" : "Update"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            More information...
          </p>
        </header>

        <UIForm {...form}>
          <form
            id={`${type}-resource-form`}
            className="flex flex-1 flex-col gap-y-20"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
              <FormField
                control={form.control}
                name="name"
                defaultValue=""
                render={({ field }) => (
                  <FormItem className="sm:col-span-4">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus
                        disabled={
                          type === "create"
                            ? addFn.isPending
                            : updateFn.isPending
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </UIForm>

        <footer className="flex items-center justify-end gap-x-4">
          <Button variant="outline" onClick={() => navigate("/resources")}>
            Cancel
          </Button>

          <Button
            form={`${type}-resource-form`}
            type="submit"
            disabled={type === "create" ? addFn.isPending : updateFn.isPending}
          >
            Save
          </Button>
        </footer>
      </article>
    );
  }

  return <FormLoader />;
};
export default Form;
