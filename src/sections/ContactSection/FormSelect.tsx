interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
}

function FormSelect({ 
  id, 
  name, 
  label, 
  value, 
  onChange, 
  options, 
  required = false 
}: FormSelectProps): JSX.Element {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-body-lg mb-[8px] text-[#6b4f4f]">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="p-[10px] border-0 border-b-[2px] border-b-[ridge] border-b-[#6b4f4f]/20 bg-transparent text-body text-[#6b4f4f] outline-none focus:border-b-[#6b4f4f] transition-colors duration-300 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%236b4f4f%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.5em] bg-[right_0.3em_center] bg-no-repeat pr-[2.5em]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;
