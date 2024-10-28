import { FieldError, UseFormRegister } from "react-hook-form";
import React from "react";
import { classNames } from "@react-pdf-viewer/core";

export type SelectItem = {
  id: string | number; // 'id' của từng item
  name: string; // Tên hiển thị của item
};

type FormSelectProps<T> = {
  name: string;
  items: T[]; // List các item như Category, Discipline, ...
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  label?: string;
  disabled?: boolean;
  className: string;
};

const FormSelect = <T extends SelectItem>({
  name,
  items,
  register,
  error,
  label,
  disabled = false,
  className,
}: FormSelectProps<T>) => (
  <div className="form-group ">
    {label && (
      <label
        htmlFor={name}
        className="mb-[10px] block text-base font-bold text-dark dark:text-white"
      >
        {label}
      </label>
    )}
    <div className="relative z-20">
      <select
        id={name}
        {...register(name)}
        className={className}
        disabled={disabled}
      >
        <option value="">Select an option</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <span className="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color"></span>
    </div>
    {error && <span className="text-red-500">{error.message}</span>}
  </div>
);

export default FormSelect;
