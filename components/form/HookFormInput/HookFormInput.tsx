'use client';

import React, { useMemo, useState } from 'react';
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';
import styles from './HookFormInput.module.css';

type InputMask = 'phone' | 'date';

interface HookFormInputProps<TFormValues extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> {
  name: Path<TFormValues>;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  maskType?: InputMask;
  required?: boolean;
  validation?: RegisterOptions<TFormValues, Path<TFormValues>>;
  viewOnly?: boolean;
}

function extractDigits(value: string) {
  return value.replace(/\D/g, '');
}

function formatPhone(value: string) {
  const digits = extractDigits(value).slice(0, 11);

  if (digits.length <= 2) {
    return digits ? `(${digits}` : '';
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

function applyMask(value: string, maskType?: InputMask) {
  if (maskType === 'phone') {
    return formatPhone(value);
  }

  if (maskType === 'date') {
    return formatDate(value);
  }

  return value;
}

export default function HookFormInput<TFormValues extends FieldValues>({
  name,
  label,
  type = 'text',
  maskType,
  required = false,
  validation,
  viewOnly = false,
  className,
  onChange,
  ...rest
}: HookFormInputProps<TFormValues>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const fieldError = errors[name];
  const isPassword = type === 'password';
  const inputType = isPassword ? (isPasswordVisible ? 'text' : 'password') : type;
  const maxLength = useMemo(() => {
    if (maskType === 'phone') {
      return 15;
    }

    if (maskType === 'date') {
      return 10;
    }

    return rest.maxLength;
  }, [maskType, rest.maxLength]);

  const registration = register(name, {
    required: required ? 'Campo obrigatorio' : false,
    ...validation,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = applyMask(event.target.value, maskType);
    event.target.value = formattedValue;
    registration.onChange(event);
    onChange?.(event);
  };

  return (
    <label className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}

      <span className={styles.inputWrapper}>
        <input
          {...rest}
          {...registration}
          className={`${styles.input} ${viewOnly ? styles.inputViewOnly : ''} ${className || ''}`}
          type={inputType}
          maxLength={maxLength}
          readOnly={viewOnly}
          aria-invalid={Boolean(fieldError)}
          onChange={handleChange}
        />

        {isPassword && !viewOnly && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
            aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {isPasswordVisible ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </span>

      {fieldError?.message && <span className={styles.error}>{String(fieldError.message)}</span>}
    </label>
  );
}
