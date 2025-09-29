import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../languages/translate';

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
  // Optional function to map a country to a translated name
  getCountryName?: (country: Country) => string;
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
  label,
  error,
  selectedCountry = countries[2], // Default to France
  getCountryName
}: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  // custom selection handler when a country is picked from the search dropdown
  const selectCountry = (country: Country) => {
    onCountryChange?.(country);
  };

  // function to resolve a display name for a country using translations (if available)
  const resolveCountryName = (c: Country) => {
    if (getCountryName) return getCountryName(c);
    try {
      const key = `countries.${c.code.toLowerCase()}`;
      const translated = t(key);
      // t returns the key if missing — use fallback to c.name
      if (translated && translated !== key) return translated;
    } catch (e) {
      // ignore and fallback
    }
    return c.name;
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

      {/* Unified container for selector + input to create a single subtle border */}
      <div
        className={`flex items-center rounded-lg bg-white transition-shadow ${
          hasError ? 'ring-1 ring-red-500' : isFocused ? 'ring-1 ring-emerald-500' : 'ring-0'
        } border ${hasError ? 'border-red-200' : 'border-gray-200'} ${className}`}
      >
        {/* Country selector: custom searchable dropdown with flags */}
        <CountryDropdown
          selected={selectedCountry}
          countries={countries}
          onSelect={(c) => selectCountry(c)}
          setFocus={(b) => setIsFocused(b)}
          getDisplayName={resolveCountryName}
          searchPlaceholder={t('search')}
        />

        {/* Vertical divider */}
        <div className="w-px h-6 bg-gray-200 mr-2" />

        <input
          type="tel"
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className={`flex-1 px-3 py-2 bg-transparent text-gray-900 placeholder-gray-400 text-base sm:text-sm focus:outline-none`}
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

// --- CountryDropdown component ---
interface CountryDropdownProps {
  selected: Country;
  countries: Country[];
  onSelect: (c: Country) => void;
  setFocus: (b: boolean) => void;
  getDisplayName?: (c: Country) => string;
  searchPlaceholder?: string;
}

function CountryDropdown({ selected, countries, onSelect, setFocus, getDisplayName, searchPlaceholder }: CountryDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  // Small helper to load flags from a CDN and fallback to the emoji provided in the country data
  function FlagImage({ code, emoji, imgClass, spanClass }: { code: string; emoji?: string; imgClass?: string; spanClass?: string }) {
    const [ok, setOk] = useState(true);
    const src = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${code.toLowerCase()}.svg`;
    return (
      <>
        {ok ? (
          <img
            src={src}
            alt={code}
            onError={() => setOk(false)}
            onLoad={() => setOk(true)}
            className={imgClass}
          />
        ) : (
          <span aria-hidden className={spanClass}>
            {emoji ?? ''}
          </span>
        )}
      </>
    );
  }

  const filtered = countries.filter(c => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const display = getDisplayName ? getDisplayName(c) : c.name;
    return (
      display.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.dialCode.includes(q)
    );
  });

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!(e.target instanceof Node)) return;
      if (!ref.current.contains(e.target)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  useEffect(() => {
    if (open) setHighlight(0);
  }, [open, query]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const c = filtered[highlight];
      if (c) {
        onSelect(c);
        setOpen(false);
        setQuery('');
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <div ref={ref} className="relative flex items-center pl-3 pr-2">
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setFocus(true);
        }}
        className="flex items-center gap-2 bg-transparent border-0 p-0 text-sm text-gray-900 focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {/* Flag image (from CDN) with emoji fallback */}
        <FlagImage code={selected.code} emoji={selected.flag} imgClass="w-5 h-3 object-cover" spanClass="text-sm" />
        <span className="text-xs text-gray-900 font-medium ml-2">{selected.dialCode}</span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              onBlur={() => setFocus(false)}
              placeholder={searchPlaceholder || 'Search country'}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none"
            />
          </div>
          <ul role="listbox" className="max-h-56 overflow-auto">
            {filtered.map((c, i) => (
              <li
                key={c.code}
                role="option"
                aria-selected={selected.code === c.code}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => {
                  // use mouseDown to prevent blur before click
                  e.preventDefault();
                  onSelect(c);
                  setOpen(false);
                  setQuery('');
                }}
                className={`flex items-center gap-2 px-2 py-1 cursor-pointer text-sm ${
                  highlight === i ? 'bg-emerald-50' : 'hover:bg-gray-50'
                } ${selected.code === c.code ? 'font-medium' : 'font-normal'}`}
              >
                <div className="w-6 h-3 flex-shrink-0">
                  <FlagImage code={c.code} emoji={c.flag} imgClass="w-6 h-3 object-cover" spanClass="text-sm" />
                </div>
                <div className="flex-1 min-w-0 text-gray-900 flex items-center justify-between">
                  <div className="truncate text-sm">{getDisplayName ? getDisplayName(c) : c.name}</div>
                  <div className="text-[10px] text-gray-600 ml-2">{c.dialCode}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}