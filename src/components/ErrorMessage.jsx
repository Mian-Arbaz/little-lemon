/**
 * Field-level validation error, associated with an input via aria-describedby.
 */
function ErrorMessage({ id, children }) {
  if (!children) return null;
  return (
    <span className="field-error" id={id} role="alert">
      {children}
    </span>
  );
}

export default ErrorMessage;
