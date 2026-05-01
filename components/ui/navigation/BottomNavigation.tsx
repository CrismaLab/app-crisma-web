import React from 'react';
import Image from 'next/image';
import styles from './BottomNavigation.module.css';

interface BottomNavigationProps {
  activeTab: 'home' | 'notifications';
  onTabChange: (tab: 'home' | 'notifications') => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className={styles.navContainer}>
      <button
        className={`${styles.navItem} ${activeTab === 'home' ? styles.active : ''}`}
        onClick={() => onTabChange('home')}
      >
        <Image
          src={activeTab === 'home' ? '/icons/icon_homeselected.png' : '/icons/icon_home.png'}
          alt="Home Icon"
          width={24}
          height={24}
        />
        <span className={styles.navLabel}>Home</span>
      </button>
      <button
        className={`${styles.navItem} ${activeTab === 'notifications' ? styles.active : ''}`}
        onClick={() => onTabChange('notifications')}
      >
        <Image
          src={activeTab === 'notifications' ? '/icons/icon_notifselected.png' : '/icons/icon_notificacao.png'}
          alt="Notifications Icon"
          width={24}
          height={24}
        />
        <span className={styles.navLabel}>Avisos</span>
      </button>
      {/* Other navigation items can be added here */}
    </nav>
  );
}