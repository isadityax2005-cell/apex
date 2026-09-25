'use client';

import { useEffect, useState } from 'react';

export default function ErrorOverlay() {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const handleErr = (msg: string | Event) => {
      setErrors((prev) => [...prev, typeof msg === 'string' ? msg : JSON.stringify(msg)]);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      setErrors((prev) => [...prev, String(event.reason?.stack || event.reason || 'Promise rejected')]);
    };
    
    // Intercept console.error to catch React/Three.js errors
    const origError = console.error;
    console.error = (...args) => {
      origError(...args);
      setErrors((prev) => [...prev, args.map(a => String(a)).join(' ')]);
    };

    window.addEventListener('error', (e) => handleErr(e.message + '\n' + e.error?.stack));
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', (e) => handleErr(e.message));
      window.removeEventListener('unhandledrejection', handleRejection);
      console.error = origError;
    };
  }, []);

  if (errors.length === 0) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(255, 0, 0, 0.9)', color: 'white', zIndex: 999999,
      padding: '20px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '12px'
    }}>
      <h2>Client-Side Errors:</h2>
      {errors.map((err, i) => (
        <pre key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '10px' }}>
          {err}
        </pre>
      ))}
    </div>
  );
}
