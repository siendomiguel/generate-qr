// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
      <Link href="/generar-qr" className={pathname === '/generar-qr' ? styles.active : ''}>Generar QR</Link>
    </nav>
  );
}
