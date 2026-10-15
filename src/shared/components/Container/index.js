import styles from "./Container.module.css";

const sizeValues = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1200px",
  full: "100%",
};

export default function Container({
  children,
  size = "xl",
  className = "",
  ...props
}) {
  const containerStyle = {
    "--container-max-width": sizeValues[size] ?? sizeValues.xl,
  };

  return (
    <div
      className={[styles.container, className]
        .filter(Boolean)
        .join(" ")}
      style={containerStyle}
      {...props}
    >
      {children}
    </div>
  );
}