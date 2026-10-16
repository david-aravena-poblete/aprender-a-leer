import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  children,
  href,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  const classes = `${styles.button} ${className}`.trim();

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}