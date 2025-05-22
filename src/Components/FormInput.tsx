import React from "react";
// import { LoginForm } from "../app/login/page";

type Props = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  label?: string;
  error?: string | null;
  maxLength?: number;
  inputRef?: React.Ref<HTMLInputElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  // style?: React.CSSProperties;
  variant?: "default" | "code";
};

const FormInput: React.FC<Props> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  checked,
  label,
  error,
  maxLength,
  inputRef,
  onKeyDown,
  // style,
  variant = "default",
}) => {
  if (type === "checkbox") {
    return (
      <label
        htmlFor=""
        className="lex items-center gap-2 text-sm text-gray-600"
      >
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="accent-indigo-500"
        />
        {label}
      </label>
    );
  }
  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength} 
        ref={inputRef}
        onKeyDown={onKeyDown}
        // style={style}
        // className="w-full px-4 py-2 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        // className={`w-full px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        //   error ? "border-red-500 pr-10" : "outline-none"
        // }`}
        className={`${
          variant === "code"
            ? "w-11 h-11 text-xl text-center px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            : "w-full px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        } ${
          error && variant !== "code"
            ? "border-red-500 pr-10"
            : "outline-none"
        }`}
      />

      {error && variant !== "code" &&(
        <svg
          className="absolute w-5 h-5 text-red-500 right-2 top-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z"
          />
        </svg>
      )}
    </div>
  );
};

export default FormInput;
