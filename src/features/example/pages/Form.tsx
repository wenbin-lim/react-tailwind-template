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
} from "../data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  InputWrapper,
  Label,
  Input,
  HelperErrorText,
} from "@src/components/form";
import { FormLoader } from "@src/components/loaders";

import toast from "react-hot-toast";
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

  // fetch data if updating
  const { data: fetchedData } = useGetOneExample(id || "");

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Example>({
    resolver: zodResolver(ExampleSchema),
    values: fetchedData,
  });

  // mutation
  const addFn = useAddOneExample();
  const updateFn = useUpdateOneExample(id || "");

  const onSubmit = (newData: Example) => {
    const mutateFn = type === "create" ? addFn : updateFn;

    mutateFn.mutate(newData, {
      onSuccess: () => {
        toast.success("Saved!");
        navigate("/examples");
      },
      onError: (error) => {
        if (!setServerValidationError(error, setError)) {
          toast.error(getGenericToastMessage("error"));
        }
      },
    });
  };

  if (type === "create" || (type === "update" && !!id && fetchedData)) {
    return (
      <main className="flex flex-col gap-y-6 py-4 sm:px-6 lg:px-8">
        <header className="px-4 sm:px-0">
          <h3 className="text-lg font-semibold">
            {type === "create" ? "New" : "Update"}
          </h3>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
            More information...
          </p>
        </header>

        <form
          id={`${type}-example-form`}
          className="flex flex-1 flex-col gap-y-10 border-y border-gray-300 px-4 py-6 dark:border-gray-700 sm:px-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
            <InputWrapper className="sm:col-span-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                disabled={
                  type === "create" ? addFn.isPending : updateFn.isPending
                }
                invalid={!!errors.name}
                {...register("name")}
              />
              <HelperErrorText isError={true}>
                {errors.name?.message}
              </HelperErrorText>
            </InputWrapper>
          </div>
        </form>

        <footer className="flex items-center justify-end gap-x-6 px-4 sm:px-0">
          <button
            type="button"
            onClick={() => navigate("/examples")}
            className="btn btn-outline ring-gray-300 dark:ring-gray-700"
          >
            Cancel
          </button>

          <button
            form={`${type}-example-form`}
            type="submit"
            disabled={type === "create" ? addFn.isPending : updateFn.isPending}
            className="btn bg-primary text-on-primary"
          >
            Save
          </button>
        </footer>
      </main>
    );
  }

  return <FormLoader />;
};
export default Form;
