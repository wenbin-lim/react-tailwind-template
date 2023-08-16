import clsx from "clsx";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";

import {
  PhotoIcon,
  MinusCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

type PreviewFile = File & {
  preview: string;
};

interface Props {
  id?: string;
  wrapperClass?: string;
  label?: string;
  required?: boolean;
  errorText?: string;
  helperText?: string;
  onChange: (value: any) => void;
  multiple?: boolean;
  options?: DropzoneOptions;
}

const FileUpload = ({
  id,
  wrapperClass,
  label,
  required,
  errorText,
  helperText,
  multiple,
  options,
  onChange,
}: Props) => {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

  const onFilesChange = (newFiles: File[]) => {
    if (multiple) {
      onChange(newFiles);
    } else {
      onChange(newFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    ...options,
    onDrop(acceptedFiles, fileRejections) {
      setRejectedFiles(fileRejections);

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      setFiles(newFiles);
      onFilesChange(newFiles);
    },
  });

  const removeFile = (file: PreviewFile) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);

    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  return (
    <div className={clsx(wrapperClass)}>
      {!!label && (
        <label
          htmlFor={id || `file_input_${new Date().getTime()}`}
          className={clsx("block text-sm font-medium leading-6", {
            "text-red-500": !!errorText,
          })}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {!!errorText && (
        <p className="text-sm leading-6 text-red-500">{errorText}</p>
      )}
      <div
        {...getRootProps({
          className: clsx(
            "mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 ",
            errorText
              ? "border-red-400 dark:border-red-500"
              : "border-gray-900/25 dark:border-gray-100/25",
          ),
        })}
      >
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor={id || `file_input_${new Date().getTime()}`}
              className={clsx(
                "relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-input-focus focus-within:ring-offset-2",
              )}
            >
              <span>Upload a file</span>
              <input
                id={id || `file_input_${new Date().getTime()}`}
                type="file"
                className="sr-only"
                {...getInputProps()}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">{helperText}</p>
        </div>
      </div>
      {!!files.length && (
        <div className="mt-2">
          {/* other files */}
          <div className="space-y-1">
            {files
              .filter((file) => !file.type.includes("image"))
              .map((file) => (
                <div className="group flex items-center gap-x-1">
                  <DocumentTextIcon className="h-6 w-6 text-gray-300 group-hover:hidden" />
                  <button
                    type="button"
                    className="transtion-all hidden hover:scale-105 active:scale-110 group-hover:block"
                    onClick={() => removeFile(file)}
                  >
                    <MinusCircleIcon className="h-6 w-6 text-red-500" />
                  </button>
                  <p className="text-sm leading-6">{file.name}</p>
                </div>
              ))}
          </div>

          {/* images */}
          <div className="flex gap-x-4 overflow-auto px-1 py-2">
            {files
              .filter((file) => file.type.includes("image"))
              .map((file) => (
                <div key={file.name} className="group relative min-w-max">
                  <img
                    className="h-20 rounded-md object-cover group-hover:ring-2 group-hover:ring-input-focus"
                    src={file.preview}
                    alt={file.name}
                  />
                  <button
                    type="button"
                    className="transtion-all absolute -right-2 -top-2 hidden hover:scale-105 active:scale-110 group-hover:block"
                    onClick={() => removeFile(file)}
                  >
                    <MinusCircleIcon className="h-6 w-6 text-red-500" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
      {!!rejectedFiles.length && (
        <div className="mt-2">
          {rejectedFiles.map(({ file, errors }) => (
            <div key={file.name}>
              <p className="text-sm leading-6 text-red-500">{file.name}</p>
              <ul className="text-xs leading-5 text-gray-500">
                {errors.map((error) => (
                  <li key={error.code}>{error.message}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default FileUpload;
