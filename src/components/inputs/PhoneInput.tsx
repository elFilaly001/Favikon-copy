interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

interface PhoneInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onCountryChange?: (country: Country) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  label?: string;
  error?: string;
  selectedCountry?: Country;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '+34' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '+39' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', dialCode: '+82' },
  { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '+86' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '+54' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', dialCode: '+212' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', dialCode: '+20' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', dialCode: '+966' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', dialCode: '+971' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', dialCode: '+27' },
];

export default function PhoneInput({
  id = "phone",
  name = "phone",
  value,
  onChange,
  onBlur,
  onCountryChange,
  placeholder = "123 45 67",
  required = false,
  className = "",
  label = "Phone number",
  error,
  selectedCountry = countries[2] // Default to France
}: PhoneInputProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find(c => c.code === e.target.value);
    if (country && onCountryChange) {
      onCountryChange(country);
    }
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
          {label} {!required && <span className="text-gray-500">(optional)</span>}
        </label>
      )}
      <div className="flex">
        <div className="relative">
          <select
            value={selectedCountry.code}
            onChange={handleCountryChange}
            className={`px-3 py-3 border rounded-l-lg shadow-sm focus:outline-none focus:ring-2 transition-colors bg-gray-50 text-gray-900 text-base sm:text-sm appearance-none pr-8 ${
              hasError 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'
            }`}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.dialCode}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <input
          type="tel"
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`flex-1 px-3 py-3 border border-l-0 rounded-r-lg shadow-sm focus:outline-none focus:ring-2 transition-colors bg-gray-50 text-gray-900 placeholder-gray-500 text-base sm:text-sm ${
            hasError 
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'
          } ${className}`}
        />
      </div>
      {hasError && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}