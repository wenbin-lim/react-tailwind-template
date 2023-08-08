/* 
	https://tailwindui.com/components/application-ui/forms/form-layouts
*/
import { useParams, useNavigate } from "react-router-dom";

import {
  ExampleSchema,
  Example,
  useGetOneExample,
  useAddOneExample,
  useUpdateOneExample,
} from "../data/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setPbServerErrors } from "@src/utils";

import { FormLoader } from "@src/components/loaders";
import { Input } from "@src/components/form";
import { Button } from "@src/components/buttons";

import toast from "react-hot-toast";

interface FormProps {
  type: "create" | "edit";
}

const Form = ({ type }: FormProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const listRoute = "/examples";

  // fetch data if editing
  const { data: fetchedData } = useGetOneExample({
    id: id || "",
    enabled: type === "edit" && !!id,
  });

  // form
  const { register, handleSubmit, setError } = useForm<Example>({
    resolver: zodResolver(ExampleSchema),
    values: fetchedData,
  });

  // mutation
  const addFn = useAddOneExample();
  const updateFn = useUpdateOneExample(id || "");

  const onSuccess = () => {
    toast.success("Saved successfully");
    navigate(listRoute);
  };

  const onError = (error: Error) => {
    if (setPbServerErrors(error, setError)) {
      toast.error("Please check form for invalid values");
    } else {
      toast.error("Failed to save, please try again later");
    }
  };

  const onSubmit = (newData: Example) => {
    if (type === "edit" && !!id) {
      updateFn.mutate(newData, {
        onSuccess,
        onError,
      });
    } else {
      addFn.mutate(newData, {
        onSuccess,
        onError,
      });
    }
  };

  if (type === "create" || (type === "edit" && fetchedData)) {
    return (
      <main className="bg-background px-4 py-4 text-on-background sm:px-6 lg:px-8">
        <form
          className="grid h-full grid-rows-[1fr_auto]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-12">
            <div className="pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                New Example
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Create a new example
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <Input
                  id="name"
                  label="Name"
                  wrapperClass="sm:col-span-full"
                  {...register("name")}
                />
                <Input
                  id="title"
                  label="Title"
                  wrapperClass="sm:col-span-full"
                  {...register("title")}
                />
                <Input
                  id="description"
                  label="Description"
                  wrapperClass="sm:col-span-full"
                  {...register("description")}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-6">
            <Button
              shadow={false}
              type="button"
              onClick={() => navigate(listRoute)}
            >
              Cancel
            </Button>
            <Button className="bg-primary text-on-primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </main>
    );
  }

  return <FormLoader />;
};
export default Form;
