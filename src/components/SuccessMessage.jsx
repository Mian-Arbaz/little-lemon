/**
 * Visually distinct success panel. Uses text and an icon (not color alone)
 * to communicate success, per the accessibility requirements.
 */
function SuccessMessage({ children }) {
  return (
    <div className="success-panel" role="status">
      <span className="success-icon" aria-hidden="true">
        ✓
      </span>
      <div>{children}</div>
    </div>
  );
}

export default SuccessMessage;
