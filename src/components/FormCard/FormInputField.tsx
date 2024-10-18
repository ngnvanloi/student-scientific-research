import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export type FormFieldProps<T extends FieldValues> = {
  type: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  className: string;
  isTextArea?: boolean;
};

const FormField = <T extends FieldValues>({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className,
  isTextArea,
}: FormFieldProps<T>) => (
  <>
    {isTextArea === true ? (
      <textarea
        rows={5}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
        className={className}
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
        className={className}
      />
    )}

    {error && <span className="error-message">{error.message}</span>}
  </>
);
export default FormField;
