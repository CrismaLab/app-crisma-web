import React from 'react';
import styles from './ClassButton.module.css';

interface ClassButtonProps {
  label: string;
  backgroundColor: string;
  onClick: (label: string) => void;
  isSelected?: boolean; // Optional prop to indicate selection state
}

export default function ClassButton({ label, backgroundColor, onClick, isSelected }: ClassButtonProps) {
  const buttonClassName = `${styles.classButton} ${isSelected ? styles.selected : ''}`;

  return (
    <button
      className={buttonClassName}
      style={{ backgroundColor: backgroundColor }}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}