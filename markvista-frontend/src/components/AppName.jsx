function AppName({ size = "default" }) {
  const base = `${size === "small" ? "hidden md:block" : ""} text-2xl font-bold leading-snug tracking-tight text-gray-900 md:text-left xl:leading-tight dark:text-white`;

  const styles = {
    default: base + " lg:text-3xl lg:leading-tight xl:text-4xl",
    small: base + " lg:text-2xl",
    xs: base + " text-xs",
  };

  return (
    <h2 className={styles[size]}>
      <span className="text-blue-900 dark:text-blue-500">Mark</span>
      Vista
    </h2>
  );
}

export default AppName;
