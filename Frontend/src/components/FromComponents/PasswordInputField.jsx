import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function PasswordInputField({
  id,
  value,
  onChange,
  placeholder = 'Enter password',
  required = false,
  className = '',
  isError = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='relative w-full'>
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`pr-10 ${isError ? 'border-red-500' : ''} ${className}`}
      />
      <button
        type='button'
        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
        onClick={togglePasswordVisibility}
        tabIndex={-1}
      >
        {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
      </button>
    </div>
  );
}
