import styles from './Button.module.css';

export default function Button({
  variant = 'search',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
