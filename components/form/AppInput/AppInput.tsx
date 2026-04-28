'use client';

import React, { useMemo, useState } from 'react';
import styles from './AppInput.module.css';

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  maskType?: 'phone' | 'date';
}

function extractDigits(value: string) {
  return value.replace(/\D/g, '');
}

function formatPhone(value: string) {
  const digits = extractDigits(value).slice(0, 11);

  if (digits.length === 0) {
    return '';
  }

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatDate(value: string) {
  const digits = extractDigits(value).slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export default function AppInput({
  placeholder,
  maskType,
  type,
  onChange,
  className,
  ...rest
}: AppInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const shouldShowPasswordToggle = type === 'password';

  const inputMaxLength = useMemo(() => {
    if (maskType === 'phone') {
      return 15;
    }

    if (maskType === 'date') {
      return 10;
    }

    return rest.maxLength;
  }, [maskType, rest.maxLength]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;

    if (!onChange) {
      return;
    }

    let formattedValue = text;

    if (maskType === 'phone') {
      formattedValue = formatPhone(text);
    } else if (maskType === 'date') {
      formattedValue = formatDate(text);
    }
    
    const syntheticEvent = {
      ...event,
      target: {
        ...event.target,
        value: formattedValue,
      },
    };

    onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
  };

  const inputType = shouldShowPasswordToggle && !isPasswordVisible ? 'password' : 'text';

  return (
    <div className={styles.container}>
      <input
        className={`${styles.input} ${shouldShowPasswordToggle ? styles.inputWithIcon : ''} ${className || ''}`}
        placeholder={placeholder}
        type={inputType}
        onChange={handleChange}
        maxLength={inputMaxLength}
        {...rest}
      />

      {shouldShowPasswordToggle && (
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        >
          {isPasswordVisible ? '🙈' : '👁️'}
        </button>
      )}
    </div>
  );
}