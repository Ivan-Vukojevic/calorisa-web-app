interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}

function FormInput({ 
  id, 
  name, 
  label, 
  type = 'text', 
  value, 
  onChange, 
  required = false, 
  autoComplete,
  placeholder
}: FormInputProps): JSX.Element {
  const validAutoCompleteValues = new Set([
    'name','honorific-prefix','given-name','additional-name','family-name','honorific-suffix',
    'nickname','email','username','new-password','current-password','one-time-code','organization-title',
    'organization','street-address','address-line1','address-line2','address-line3','address-level4','address-level3',
    'address-level2','address-level1','country','country-name','postal-code','cc-name','cc-given-name','cc-additional-name',
    'cc-family-name','cc-number','cc-exp','cc-exp-month','cc-exp-year','cc-csc','cc-type','transaction-currency','transaction-amount',
    'language','bday','bday-day','bday-month','bday-year','sex','tel','tel-country-code','tel-national','tel-area-code','tel-local',
    'tel-local-prefix','tel-local-suffix','tel-extension','impp','off','on'
  ]);

  const normalizedAutoComplete = typeof autoComplete === 'string' ? autoComplete.trim() : '';

  const finalAutoComplete = validAutoCompleteValues.has(normalizedAutoComplete)
    ? normalizedAutoComplete
    : type === 'email'
    ? 'email'
    : type === 'tel'
    ? 'tel'
    : name.toLowerCase().includes('name')
    ? 'name'
    : undefined;

  return (
    <div className="flex flex-col flex-1">
      <label htmlFor={id} className="text-body-lg mb-[8px] text-[#6b4f4f]">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        {...(finalAutoComplete ? { autoComplete: finalAutoComplete } : {})}
        placeholder={placeholder}
        className="p-[10px] border-0 border-b-[2px] border-b-[ridge] border-b-[#6b4f4f]/20 bg-transparent text-body text-[#6b4f4f] outline-none focus:border-b-[#6b4f4f] transition-colors duration-300"
      />
    </div>
  );
}

export default FormInput;
