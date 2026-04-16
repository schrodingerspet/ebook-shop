import './FormInput.css'

function FormInput({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  rows = 4,
  ...rest
}) {
  return (
    <div className="form-input">
      <label htmlFor={id} className="form-input__label">
        {label}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`form-input__control ${error ? 'has-error' : ''}`}
          {...rest}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-input__control ${error ? 'has-error' : ''}`}
          {...rest}
        />
      )}

      {error ? <p className="form-input__error">{error}</p> : null}
    </div>
  )
}

export default FormInput
