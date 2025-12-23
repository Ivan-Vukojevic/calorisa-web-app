import { forwardRef } from 'react';

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ id, name, label, value, onChange, required = false }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-body-lg mb-[8px] text-[#6b4f4f]">
          {label}
        </label>
        <textarea
          ref={ref}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="p-[10px] border-0 border-b-[2px] border-b-[ridge] border-b-[#6b4f4f]/20 bg-transparent text-body text-[#6b4f4f] outline-none focus:border-b-[#6b4f4f] transition-colors duration-300 min-h-[150px] resize-vertical"
        />
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
