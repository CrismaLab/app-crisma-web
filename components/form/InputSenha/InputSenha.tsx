'use client';

import React, { useState } from 'react';
import styles from './InputSenha.module.css';

interface InputSenhaProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export default function InputSenha({ placeholder, ...rest }: InputSenhaProps) {
  const [input, setInput] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    if (rest.onChange) {
      rest.onChange(event);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputArea}>
        <input
          className={styles.input}
          placeholder={placeholder}
          type={hidePassword ? 'password' : 'text'}
          value={input}
          onChange={handleChange}
          {...rest}
        />
        <button
          type="button"
          className={styles.icon}
          onClick={() => setHidePassword(!hidePassword)}
          aria-label={hidePassword ? 'Show password' : 'Hide password'}
        >
          {hidePassword ? '👁️' : '🙈'}
        </button>
      </div>
    </div>
  );
}