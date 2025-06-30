import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, style, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>{label}</label>}
    <input
      {...props}
      style={{
        width: '100%', padding: 10, borderRadius: 4, border: error ? '1px solid #d9534f' : '1px solid #ccc',
        outline: error ? '1px solid #d9534f' : undefined,
        ...style
      }}
    />
    {error && <div style={{ color: '#d9534f', marginTop: 4, fontSize: 13 }}>{error}</div>}
  </div>
);

export default Input; 