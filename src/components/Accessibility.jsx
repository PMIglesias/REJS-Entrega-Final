import React from 'react';

export const AccessibleButton = React.forwardRef(({ 
  children, 
  onClick, 
  disabled, 
  ariaLabel, 
  ariaPressed, 
  ariaExpanded,
  type = 'button',
  ...props 
}, ref) => (
  <button
    ref={ref}
    type={type}
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    aria-pressed={ariaPressed}
    aria-expanded={ariaExpanded}
    {...props}
  >
    {children}
  </button>
));

AccessibleButton.displayName = 'AccessibleButton';

export const AccessibleLink = React.forwardRef(({ 
  children, 
  to, 
  ariaLabel, 
  ariaDescribedBy,
  ...props 
}, ref) => (
  <a
    ref={ref}
    href={to}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
    {...props}
  >
    {children}
  </a>
));

AccessibleLink.displayName = 'AccessibleLink';

export const AccessibleInput = React.forwardRef(({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled,
  ariaLabel,
  ariaDescribedBy,
  required,
  ...props
}, ref) => (
  <input
    ref={ref}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
    aria-required={required}
    required={required}
    {...props}
  />
));

AccessibleInput.displayName = 'AccessibleInput';

export const AccessibleCheckbox = React.forwardRef(({
  checked,
  onChange,
  ariaLabel,
  ariaDescribedBy,
  disabled,
  ...props
}, ref) => (
  <input
    ref={ref}
    type="checkbox"
    checked={checked}
    onChange={onChange}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
    aria-checked={checked}
    disabled={disabled}
    {...props}
  />
));

AccessibleCheckbox.displayName = 'AccessibleCheckbox';

export const AccessibleModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  role = 'dialog',
  ariaLabelledBy = 'modal-title'
}) => {
  if (!isOpen) return null;

  return (
    <div
      role={role}
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '0.5rem',
          padding: '2rem',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <h2 id={ariaLabelledBy} style={{ marginBottom: '1rem' }}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export const AccessibleAlert = ({ 
  type = 'info', 
  message, 
  role = 'alert' 
}) => (
  <div
    role={role}
    aria-live="polite"
    aria-atomic="true"
    style={{
      padding: '1rem',
      borderRadius: '0.5rem',
      backgroundColor:
        type === 'success' ? '#dcfce7' :
        type === 'error' ? '#fee2e2' :
        type === 'warning' ? '#fef3c7' :
        '#dbeafe',
      color:
        type === 'success' ? '#166534' :
        type === 'error' ? '#991b1b' :
        type === 'warning' ? '#92400e' :
        '#1e40af'
    }}
  >
    {message}
  </div>
);

export const AccessibleNavigation = ({ items, currentPath }) => (
  <nav aria-label="Main navigation">
    <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((item) => (
        <li key={item.path}>
          <a
            href={item.path}
            aria-current={currentPath === item.path ? 'page' : undefined}
            style={{
              textDecoration: currentPath === item.path ? 'underline' : 'none',
              fontWeight: currentPath === item.path ? 'bold' : 'normal'
            }}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export const AccessibleHeading = ({ level = 1, children, id, className, ...props }) => {
  const HeadingTag = `h${level}`;
  return (
    <HeadingTag id={id} className={className} {...props}>
      {children}
    </HeadingTag>
  );
};

export const AccessibleImage = ({ 
  src, 
  alt, 
  title, 
  width, 
  height,
  ...props 
}) => (
  <img
    src={src}
    alt={alt}
    title={title}
    width={width}
    height={height}
    {...props}
  />
);

export const SkipToMainContent = () => (
  <a
    href="#main-content"
    style={{
      position: 'absolute',
      top: '-9999px',
      left: '-9999px',
      zIndex: 999,
    }}
    onFocus={(e) => {
      e.target.style.top = '0';
      e.target.style.left = '0';
    }}
    onBlur={(e) => {
      e.target.style.top = '-9999px';
      e.target.style.left = '-9999px';
    }}
  >
    Ir al contenido principal
  </a>
);

export const AccessibleForm = ({ 
  children, 
  onSubmit, 
  ariaLabel,
  noValidate,
  ...props 
}) => (
  <form
    onSubmit={onSubmit}
    aria-label={ariaLabel}
    noValidate={noValidate}
    {...props}
  >
    {children}
  </form>
);

export const AccessibleFormField = ({
  label,
  inputId,
  errorMessage,
  children
}) => (
  <div style={{ marginBottom: '1rem' }}>
    {label && (
      <label htmlFor={inputId} style={{ display: 'block', marginBottom: '0.5rem' }}>
        {label}
      </label>
    )}
    {children}
    {errorMessage && (
      <div
        id={`${inputId}-error`}
        role="alert"
        style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}
      >
        {errorMessage}
      </div>
    )}
  </div>
);

export const AccessibleTable = ({ 
  headers, 
  rows, 
  caption,
  ariaLabel
}) => (
  <table aria-label={ariaLabel}>
    {caption && <caption>{caption}</caption>}
    <thead>
      <tr>
        {headers.map((header, idx) => (
          <th key={idx} scope="col">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, idx) => (
        <tr key={idx}>
          {row.map((cell, cellIdx) => (
            <td key={cellIdx}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
