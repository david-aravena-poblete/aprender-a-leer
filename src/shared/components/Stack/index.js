import styles from "./Stack.module.css";

const gapValues = {
  none: "0",
  xs: "var(--spacing-xs)",
  sm: "var(--spacing-sm)",
  md: "var(--spacing-md)",
  lg: "var(--spacing-lg)",
  xl: "var(--spacing-xl)",
};

export default function Stack({
  children,
  gap = "md",
  align = "stretch",
  justify = "flex-start",
  height = "auto",
  flex = false,
  className = "",
  ...props
}) {
  const stackStyle = {
    "--stack-gap": gapValues[gap] ?? gapValues.md,
    "--stack-align": align,
    "--stack-justify": justify,
    "--stack-height": height,
  };

  return (
    <div
      className={[
        styles.stack,
        flex ? styles.flex : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={stackStyle}
      {...props}
    >
      {children}
    </div>
  );
}