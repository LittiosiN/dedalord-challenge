import clsx from "clsx"
import { 
  FieldErrors,
  UseFormRegister,
} from "react-hook-form"

export interface FormInputProps {
  label: string,
  id: string,
  register: UseFormRegister<any>,
  errors: FieldErrors,
  type?: string,
  required?: boolean | string,
  disabled?: boolean,
  placeHolder?: string,
  errorMessage?: string
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  register,
  errors,
  type,
  required,
  disabled,
  placeHolder,
}) => {
    return (
      <div className="mt-2">
        <label
          className="
            block
            text-sm
            text-gray-900
            font-medium
            leading-6
          "
          htmlFor={id}
        >
          {label}
        </label>
        <div className="mt-2">
          <input
            id={id}
            type={type}
            disabled={disabled}
            placeholder={placeHolder}
            autoComplete="off"
            {...register(id, { required })}
            className={clsx(`
              form-input
              block
              w-full
              rounded-md
              border-0
              py-1.5
              px-2
              text-black
              shadow-sm
              ring-1
              ring-inset
              ring-gray-300
              focus:ring-2
              focus:ring-inset
              focus:ring-gray-900
              placeholder:text-gray-400
              sm:text-sm
              sm:leading-6`,
              errors[id] && 'focus:ring-rose-500',
              disabled && 'opacity-50 cursor-default'
            )}
            aria-invalid={errors[id] ? "true" : "false"}
          />
          {errors[id] && <p className="mt-2 text-xs text-rose-500">{errors[id]?.message?.toString()}</p>}
        </div>
      </div>
    );
};


export default FormInput