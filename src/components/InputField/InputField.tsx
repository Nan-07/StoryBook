
import React, { useId, useState, forwardRef } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

export type Variant = "filled" | "outlined" | "ghost";
export type Size = "sm" | "md" | "lg";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: Variant;
  size?: Size;
  type?: string;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  loading?: boolean;
  className?: string;
  name?: string;
  "aria-label"?: string;
}

const sizeStyles: Record<Size, string> = {
  sm: "text-sm py-1 px-2 rounded-md",
  md: "text-base py-2 px-3 rounded-lg",
  lg: "text-lg py-3 px-4 rounded-xl",
};

const variantStyles: Record<Variant, string> = {
  filled:
    "bg-gray-100 dark:bg-gray-800 border border-transparent focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600",
  outlined:
    "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600",
  ghost:
    "bg-transparent border border-transparent focus:ring-0",
};

const labelClass = "block mb-1 font-medium text-gray-700 dark:text-gray-200";

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled = false,
      invalid = false,
      variant = "outlined",
      size = "md",
      type = "text",
      clearable = false,
      showPasswordToggle = false,
      loading = false,
      className,
      name,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) => {
    const id = useId();
    const [internalType, setInternalType] = useState(type);
    const showClear = clearable && !disabled && !!value;
    const isPassword = type === "password";

    const baseInput = classNames(
      "w-full transition-all focus:outline-none",
      sizeStyles[size],
      variantStyles[variant],
      {
        "opacity-50 cursor-not-allowed": disabled,
        "ring-1 ring-red-400 animate-shake": invalid && !!errorMessage,
        "pr-10": showClear || (showPasswordToggle && isPassword) || loading,
      },
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className={labelClass}>
            {label}
          </label>
        )}

        <div className="relative">
          <motion.input
            id={id}
            ref={ref}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={invalid}
            aria-describedby={errorMessage ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            aria-label={ariaLabel}
            className={baseInput}
            type={internalType}
            {...rest}
            whileFocus={{ scale: 1.001 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />

          {/* Loading spinner */}
          {loading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </div>
          )}

          {/* Clear button */}
          {showClear && !loading && (
            <button
              type="button"
              aria-label="Clear input"
              onClick={() => {
                const ev = { target: { value: "" } } as unknown as React.ChangeEvent<HTMLInputElement>;
                if (onChange) {
                  onChange(ev);
                }
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-5 w-5 text-gray-500 hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}

          {/* Password toggle */}
          {showPasswordToggle && isPassword && !loading && (
            <button
              type="button"
              aria-label={internalType === "password" ? "Show password" : "Hide password"}
              onClick={() => setInternalType(t => (t === "password" ? "text" : "password"))}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {internalType === "password" ? (
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.985 9.985 0 012.005-3.25m3.792-2.58A9.97 9.97 0 0112 5c4.477 0 8.268 2.943 9.542 7-1.083 3.449-3.762 6.227-7.28 7.28" />
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Helper or Error */}
        <div className="mt-1">
          {errorMessage ? (
            <p id={`${id}-error`} role="alert" className="text-sm text-red-600">
              {errorMessage}
            </p>
          ) : helperText ? (
            <p id={`${id}-helper`} className="text-sm text-gray-500 dark:text-gray-400">
              {helperText}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
