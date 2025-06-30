import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const styles = {
  primary: 'background: #007bff; color: #fff; border: none;',
  secondary: 'background: #ccc; color: #222; border: none;',
  danger: 'background: #d9534f; color: #fff; border: none;'
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, style, ...props }) => (
  <button
    style={{
      ...(variant === 'primary' ? { background: '#007bff', color: '#fff' } :
        variant === 'secondary' ? { background: '#ccc', color: '#222' } :
        { background: '#d9534f', color: '#fff' }),
      border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer', ...style
    }}
    {...props}
  >
    {children}
  </button>
);

export default Button; 