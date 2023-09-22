import { useState } from "react";
import clsx from "clsx";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";

import {
  PhotoIcon,
  MinusCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

/* 
  !! IMPORTANT !!
  https://react-dropzone.js.org/#section-basic-example
	
  Use <Controller /> from react-hook-form to render and control this component.

  Add children into <FileUpload /> to render custom UI, else default UI will be rendered.
  
  <Controller
    name=""
    control={control}
    render={({ field }) => (
      <FileUpload
        onChange={field.onChange}
      >
        {({ acceptedFiles, rejectedFiles, removeAcceptedFile }) => (
          <ul>
            {acceptedFiles.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        )}
      </FileUpload>
    )}
  />
*/

type FileWithPreview = File & {
  preview?: string;
};

type DocumentListItemProps = {
  label?: string;
  onClickRemove?: () => void;
};

export const DocumentListItem = ({
  label,
  onClickRemove,
}: DocumentListItemProps) => (
  <div className="group flex items-center gap-x-1">
    <DocumentTextIcon className="h-6 w-6 text-gray-300 group-hover:hidden" />
    {onClickRemove && (
      <button
        type="button"
        className="transtion-all hidden hover:scale-105 active:scale-110 group-hover:block"
        onClick={onClickRemove}
      >
        <MinusCircleIcon className="h-6 w-6 text-red-500" />
      </button>
    )}
    {label && <p className="text-sm leading-6">{label}</p>}
  </div>
);

type ImageListItemProps = {
  imageSrc?: string;
  imageAlt?: string;
  onClickRemove?: () => void;
};

export const ImageListItem = ({
  imageSrc,
  imageAlt,
  onClickRemove,
}: ImageListItemProps) => (
  <div className="group relative min-w-max">
    {imageSrc ? (
      <img
        className="group-hover:ring-input-focus h-20 rounded-md object-cover group-hover:ring-2"
        src={imageSrc}
        alt={imageAlt}
      />
    ) : (
      <PhotoIcon className="h-20 w-20 text-gray-300" />
    )}
    {onClickRemove && (
      <button
        type="button"
        className="transtion-all absolute -right-2 -top-2 hover:scale-105 active:scale-110 group-hover:block"
        onClick={onClickRemove}
      >
        <MinusCircleIcon className="h-6 w-6 text-red-500" />
      </button>
    )}
  </div>
);

type RejectedFileErrorsProps = {
  files: FileRejection[];
};

export const RejectedFileErrors = ({ files }: RejectedFileErrorsProps) =>
  files.length > 0 && (
    <div>
      {files.map(({ file, errors }) => (
        <div key={file.name}>
          <p className="text-sm leading-6 text-red-400 dark:text-red-600">
            {file.name}
          </p>
          <ul className="text-xs leading-5 text-gray-700 dark:text-gray-500">
            {errors.map((error) => (
              <li key={error.code}>{error.message}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

type FileUploadChildrenProps = {
  acceptedFiles: FileWithPreview[];
  rejectedFiles: FileRejection[];
  removeAcceptedFile: (file: FileWithPreview) => void;
};

type FileUploadProps = {
  id?: string;
  invalid?: boolean;
  helperText?: string;
  currentFile?: JSX.Element;
  dropzoneOptions?: DropzoneOptions;
  children?: (props: FileUploadChildrenProps) => JSX.Element;
} & (
  | {
      multiple?: false | undefined;
      onChange: (value: File) => void;
    }
  | {
      multiple: true;
      onChange: (value: File[]) => void;
    }
);

const FileUpload = ({
  onChange,
  id,
  multiple,
  invalid,
  helperText,
  currentFile,
  dropzoneOptions,
  children,
}: FileUploadProps) => {
  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPreview[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

  const onFilesChange = (newFiles: File[]) =>
    multiple ? onChange(newFiles) : onChange(newFiles[0]!);

  const { getRootProps, getInputProps, open } = useDropzone({
    ...dropzoneOptions,
    noClick: true,
    multiple,
    onDrop(acceptedFiles, fileRejections) {
      setRejectedFiles(fileRejections);

      const newAcceptedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      setAcceptedFiles(newAcceptedFiles);
      onFilesChange(newAcceptedFiles);
    },
  });

  const removeFile = (file: FileWithPreview) => {
    const filesAfterRemove = [...acceptedFiles];
    filesAfterRemove.splice(filesAfterRemove.indexOf(file), 1);

    setAcceptedFiles(filesAfterRemove);
    onFilesChange(filesAfterRemove);
  };

  const filterDocumentFiles = (files: FileWithPreview[]) =>
    files.filter((file) => !file.type.includes("image"));

  const filterImageFiles = (files: FileWithPreview[]) =>
    files.filter((file) => file.type.includes("image"));

  return (
    <div className="flex flex-col gap-y-2">
      <div
        {...getRootProps({
          className: clsx(
            "flex cursor-pointer justify-center rounded-lg border border-dashed px-6 py-10",
            invalid
              ? "border-red-400 dark:border-red-500"
              : "border-gray-300 dark:border-gray-700",
          ),
        })}
        onClick={open}
      >
        <div className="flex flex-col items-center text-center">
          {currentFile || (
            <PhotoIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
          )}
          <p className="mt-4 flex text-sm leading-6 text-gray-600">
            <span className="font-bold text-primary">Upload a file</span>
            <span>&nbsp;or drag and drop</span>
          </p>
          {helperText && (
            <p className="text-xs leading-5 text-gray-600">{helperText}</p>
          )}
          <input
            id={id}
            type="file"
            className="sr-only"
            hidden
            {...getInputProps()}
          />
        </div>
      </div>

      {children &&
        children({
          acceptedFiles,
          rejectedFiles,
          removeAcceptedFile: removeFile,
        })}

      {/* accepted other document files */}
      {!children && filterDocumentFiles(acceptedFiles).length > 0 && (
        <div>
          {filterDocumentFiles(acceptedFiles).map((file) => (
            <DocumentListItem
              key={file.name}
              label={file.name}
              onClickRemove={() => removeFile(file)}
            />
          ))}
        </div>
      )}

      {/* accepted image files */}
      {!children && filterImageFiles(acceptedFiles).length > 0 && (
        <div className="flex gap-x-4 overflow-auto px-1 py-2">
          {filterImageFiles(acceptedFiles).map((file) => (
            <ImageListItem
              key={file.name}
              imageSrc={file.preview}
              imageAlt={file.name}
              onClickRemove={() => removeFile(file)}
            />
          ))}
        </div>
      )}

      {!children && <RejectedFileErrors files={rejectedFiles} />}
    </div>
  );
};
export default FileUpload;
