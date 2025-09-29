interface EmailInputProps {
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

export default function EmailInput({
  id = "email",
  name = "email",
  value,
  onChange,
  onBlur,
  placeholder = "example@gmail.com",
  required = true,
  className = "",
  label = "Email",
  error
}: EmailInputProps) {
  // Sanitize input to prevent XSS
  const sanitizeInput = (input: string) => {
    return input
      .replace(/[<>'"]/g, ''); // Remove potential XSS characters but keep spaces and case
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Just pass through the original event for now to test
    onChange?.(e);
  };

  const validateEmail = (email: string) => {
    if (!email) return required ? 'This field is required' : '';
    
    // Check for @ symbol
    if (!email.includes('@')) {
      return 'Email must contain @ symbol';
    }
    
    // Enhanced email regex for better validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    
    // Additional checks
    const parts = email.split('@');
    if (parts.length !== 2) return 'Please enter a valid email address';
    if (parts[0].length === 0) return 'Email must have a username before @';
    if (parts[1].length === 0) return 'Email must have a domain after @';
    if (!parts[1].includes('.')) return 'Email domain must contain a dot';
    
    return '';
  };

  const currentError = error || validateEmail(value || '');
  const hasError = !!currentError;

  return (
    <div className="space-y-1">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type="email"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete="email"
        className={`w-full px-3 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors bg-gray-50 text-gray-900 placeholder-gray-500 text-base sm:text-sm ${
          hasError 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'
        } ${className}`}
      />
      {hasError && (
        <p className="text-sm text-red-600 mt-1">
          {currentError}
        </p>
      )}
    </div>
  );
}
