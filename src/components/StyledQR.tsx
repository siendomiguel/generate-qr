'use client';

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

const qrCode = new QRCodeStyling({
  width: 500,
  height: 500,
  type: 'canvas',
  data: '',
  dotsOptions: {
    color: '#000000',
    type: 'rounded',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    type: 'rounded',
    color: '#000000',
  },
  cornersDotOptions: {
    type: 'rounded',
    color: '#000000',
  },
  qrOptions: {
    errorCorrectionLevel: 'H',
  },
  imageOptions: {
    margin: 10,
  },
});

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

  useImperativeHandle(ref, () => ({
    download: () => {
      qrCode.download({ name: 'qr-code', extension: 'png' });
    },
  }));

  useEffect(() => {
    qrCode.update({
      data,
      dotsOptions: { color: dotColor },
      backgroundOptions: { color: bgColor },
      cornersSquareOptions: { color: cornerColor },
      cornersDotOptions: { color: cornerColor },
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      qrCode.append(containerRef.current);
    }
  }, [data, dotColor, bgColor, cornerColor]);

  return <div ref={containerRef}></div>;
});

export default StyledQR;
