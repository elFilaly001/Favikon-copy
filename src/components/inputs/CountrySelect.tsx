interface Country {
  code: string;
  name: string;
  flag: string;
}

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../languages/translate';

interface CountrySelectProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCountryChange?: (countryCode: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  getCountryName?: (country: Country) => string;
}

const countries: Country[] = [
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
];

export default function CountrySelect({
  id = "country",
  name = "country",
  value,
  onChange,
  onCountryChange,
  onBlur,
  required = false,
  className = "",
  label,
  error,
  placeholder,
  getCountryName
}: CountrySelectProps) {
  const { t } = useTranslation();
  const labelText = label ?? t('common.country');
  const placeholderText = placeholder ?? t('common.country');

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  // Flag image loader that uses CDN flags and falls back to emoji when not available
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

  const hasError = !!error;

  const resolveName = (c: Country) => {
    if (getCountryName) return getCountryName(c);
    const key = `countries.${c.code.toLowerCase()}`;
    const translated = t(key);
    return translated && translated !== key ? translated : c.name;
  };

  const filtered = countries.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const display = resolveName(c).toLowerCase();
    return display.includes(q) || c.code.toLowerCase().includes(q);
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

  const select = (code: string) => {
    // call onCountryChange with code
    onCountryChange?.(code);
    // call onChange with synthetic event for compatibility
    if (onChange) {
      const synthetic = { target: { value: code, name } } as unknown as React.ChangeEvent<HTMLSelectElement>;
      onChange(synthetic);
    }
    setOpen(false);
    setQuery('');
  };

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
      if (c) select(c.code);
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    }
  };

  const selectedCountry = countries.find((c) => c.code === value) || countries[0];

  return (
    <div className="space-y-1">
      {labelText && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {labelText} {!required && <span className="text-gray-500">({t('common.optional') ?? 'optional'})</span>}
        </label>
      )}

      <div ref={ref} className={`relative ${className}`}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`w-full flex items-center gap-2 px-3 py-2 border rounded-lg bg-white ${hasError ? 'border-red-300' : 'border-gray-200'}`}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <FlagImage code={selectedCountry.code} emoji={selectedCountry.flag} imgClass="w-5 h-3 object-cover" spanClass="text-sm" />
          <span className="truncate text-sm text-gray-900">{resolveName(selectedCountry)}</span>
          <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="p-2">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t('search')}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none"
              />
            </div>
            <ul role="listbox" className="max-h-56 overflow-auto">
              {filtered.map((c, i) => (
                <li
                  key={c.code}
                  role="option"
                  aria-selected={value === c.code}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={(e) => { e.preventDefault(); select(c.code); }}
                  className={`flex items-center gap-2 px-3 py-2 cursor-pointer text-sm ${highlight === i ? 'bg-emerald-50' : 'hover:bg-gray-50'} ${value === c.code ? 'font-medium' : 'font-normal'}`}
                >
                  <div className="w-6 h-3 flex-shrink-0">
                    <FlagImage code={c.code} emoji={c.flag} imgClass="w-6 h-3 object-cover" spanClass="text-sm" />
                  </div>
                  <div className="flex-1 min-w-0 text-gray-900 flex items-center justify-between">
                    <div className="truncate text-sm">{resolveName(c)}</div>
                    <div className="text-[10px] text-gray-600 ml-2">{c.code}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {hasError && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}