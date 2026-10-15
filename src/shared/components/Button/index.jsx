import styles from "./Button.module.css";

export default function Button({
  children,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles.button} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}