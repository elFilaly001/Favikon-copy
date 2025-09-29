import { useState } from 'react';

interface PasswordInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

export default function PasswordInput({
  id = "password",
  name = "password",
  value,
  onChange,
  onBlur,
  placeholder = "Enter your password",
  required = true,
  className = "",
  label = "Password",
  error
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Sanitize input to prevent XSS
  const sanitizeInput = (input: string) => {
    return input
      .replace(/[<>'"&]/g, ''); // Remove potential XSS characters but keep spaces
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Just pass through the original event for now to test
    onChange?.(e);
  };

  // Only use the passed error prop, don't validate during render to prevent hydration issues
  const hasError = !!error;

  return (
    <div className="space-y-1">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete="current-password"
          className={`w-full px-3 py-2 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors bg-gray-50 text-gray-900 placeholder-gray-500 text-base sm:text-sm ${
            hasError 
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'
          } ${className}`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <img 
              src="https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/eye-slash.svg" 
              alt="Hide password"
              className="h-5 w-5"
            />
          ) : (
            <img 
              src="https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/eye.svg" 
              alt="Show password"
              className="h-5 w-5"
            />
          )}
        </button>
      </div>
      {hasError && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
