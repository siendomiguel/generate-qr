'use client';

import { useRef, useState } from 'react';
import StyledQR from '@/components/StyledQR';

export default function GenerarQRPage() {
  const [input, setInput] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [dotColor, setDotColor] = useState('#00747C');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const qrRef = useRef<{ download: () => void }>(null);
  const [cornerColor, setCornerColor] = useState('#000000'); // Por defecto: negro


  const handleGenerate = () => {
    if (input.trim()) setShowQR(true);
  };

  const handleDownload = () => {
    qrRef.current?.download();
  };

  return (
    <div>
      <h1>Generador de QR Avanzado</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={input}
          placeholder="Ingresa el enlace"
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem',
            background: 'var(--color-dark)',
            color: 'var(--color-cyan)',
            border: '1px solid var(--color-gray)',
            borderRadius: '6px'
          }}
        />
        <button
          onClick={handleGenerate}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--color-teal)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Generar QR
        </button>
      </div>

      {showQR && (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
    
    {/* Selectores de color */}
    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
  <div style={{ textAlign: 'center' }}>
    <label htmlFor="dotColor">Color del QR</label><br />
    <input
      type="color"
      id="dotColor"
      value={dotColor}
      onChange={(e) => setDotColor(e.target.value)}
    />
  </div>
  <div style={{ textAlign: 'center' }}>
    <label htmlFor="bgColor">Color de fondo</label><br />
    <input
      type="color"
      id="bgColor"
      value={bgColor}
      onChange={(e) => setBgColor(e.target.value)}
    />
  </div>
  <div style={{ textAlign: 'center' }}>
    <label htmlFor="cornerColor">Color de extremos</label><br />
    <input
      type="color"
      id="cornerColor"
      value={cornerColor}
      onChange={(e) => setCornerColor(e.target.value)}
    />
  </div>
</div>


    {/* QR centrado */}
    <div>
    <StyledQR
  ref={qrRef}
  data={input}
  dotColor={dotColor}
  bgColor={bgColor}
  cornerColor={cornerColor}
/>

    </div>

    {/* Botón de descarga */}
    <button
      onClick={handleDownload}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--color-cyan)',
        color: '#000',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}
    >
      Descargar QR
    </button>
  </div>
)}

    </div>
  );
}
