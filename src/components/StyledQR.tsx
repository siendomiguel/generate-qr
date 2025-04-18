'use client';

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

type StyledQRProps = {
  data: string;
  dotColor: string;
  bgColor: string;
  cornerColor: string;
};

const StyledQR = forwardRef(function StyledQR(
  { data, dotColor, bgColor, cornerColor }: StyledQRProps,
  ref: React.Ref<{ download: () => void }>
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    download: () => {
      qrCodeRef.current?.download({ name: 'qr-code', extension: 'png' });
    },
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Crear solo una vez
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: 500,
        height: 500,
        type: 'canvas',
        data: data,
        dotsOptions: {
          color: dotColor,
          type: 'square',
        },
        backgroundOptions: {
          color: bgColor,
        },
        cornersSquareOptions: {
          type: 'square',
          color: cornerColor,
        },
        cornersDotOptions: {
          type: 'square',
          color: cornerColor,
        },
        qrOptions: {
          errorCorrectionLevel: 'H',
        },
        imageOptions: {
          margin: 10,
        },
      });

      if (containerRef.current) {
        qrCodeRef.current.append(containerRef.current);
      }
    } else {
      qrCodeRef.current.update({
        data,
        dotsOptions: { color: dotColor },
        backgroundOptions: { color: bgColor },
        cornersSquareOptions: {
          color: cornerColor,
        },
        cornersDotOptions: {
          color: cornerColor,
        },
      });
    }
  }, [data, dotColor, bgColor, cornerColor]);

  return <div ref={containerRef}></div>;
});

export default StyledQR;
