import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormInputGroupProps {
  label: string;
  id: string;
  type?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  error?: FieldError;
  errorMessage?: string;
}

const FormInputGroup: React.FC<FormInputGroupProps> = ({
  label,
  id,
  type = 'text',
  register,
  required = false,
  error,
  errorMessage,
}) => (
  <div className="input-group">
    <label htmlFor={id}>{label}:</label>
    <input id={id} type={type} {...register(id, { required })} />
    {error && <span role="alert">{errorMessage || error.message}</span>}
  </div>
);

export default FormInputGroup;
