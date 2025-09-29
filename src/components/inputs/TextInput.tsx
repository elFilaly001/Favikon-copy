interface TextInputProps {
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
  type?: 'text' | 'tel';
}

export default function TextInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  className = "",
  label,
  error,
  type = 'text'
}: TextInputProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  // Only show error if explicitly passed (don't validate automatically)
  const hasError = !!error;

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-3 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors bg-gray-50 text-gray-900 placeholder-gray-500 text-base sm:text-sm ${
          hasError 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'
        } ${className}`}
      />
      {hasError && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}