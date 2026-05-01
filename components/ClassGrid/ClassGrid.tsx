import React from 'react';
import styles from './ClassGrid.module.css';
import ClassButton from '../ClassButton/ClassButton'; // Import ClassButton

interface ClassGridProps {
  classes: { id: string; name: string; color: string }[];
  onSelectClass: (id: string) => void;
  selectedClassId?: string; // Add selectedClassId prop
}

export default function ClassGrid({ classes, onSelectClass, selectedClassId }: ClassGridProps) {
  return (
    <div className={styles.gridContainer}>
      {classes.map((cls) => (
        <ClassButton
          key={cls.id}
          label={cls.name}
          backgroundColor={cls.color}
          onClick={() => onSelectClass(cls.id)}
          isSelected={selectedClassId === cls.id} // Pass isSelected prop
        />
      ))}
    </div>
  );
}