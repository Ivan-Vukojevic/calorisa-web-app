import { motion } from 'framer-motion';

interface FormCheckboxProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function FormCheckbox({ 
  id, 
  name, 
  label, 
  checked, 
  onChange, 
  required = false 
}: FormCheckboxProps): JSX.Element {
  return (
    <motion.div 
      className="flex items-start gap-3"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
        className="mt-1 w-5 h-5 text-[#6b4f4f] border-[#6b4f4f]/30 rounded focus:ring-[#6b4f4f] focus:ring-2 cursor-pointer"
      />
      <label 
        htmlFor={id} 
        className="text-sm text-[#6b4f4f] cursor-pointer select-none"
      >
        {label}
        {required && <span className="text-red-500 ml-1 text-xs">*</span>}
      </label>
    </motion.div>
  );
}

export default FormCheckbox;
