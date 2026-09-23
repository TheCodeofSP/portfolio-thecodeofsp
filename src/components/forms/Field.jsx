export default function Field({
  children,
  hint,
  label,
  name,
  onChange,
  required,
  textarea,
  type = "text",
  value,
}) {
  const sharedProps = {
    id: name,
    name,
    onChange,
    required,
    value,
    "aria-required": required || undefined,
  };

  return (
    <div className="discovery__field">
      <label htmlFor={name}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      {children ||
        (textarea ? (
          <textarea {...sharedProps} rows="5" />
        ) : (
          <input {...sharedProps} type={type} />
        ))}

      {hint && <small>{hint}</small>}
    </div>
  );
}
