function FormRow({ label, error, children }) {
  return (
    <div
      className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-[2.4rem] py-[1.2rem]"
      label={label}
    >
      {label && <label>{label}</label>}
      {children}
      {error && <p className="font-[500] text-red-600">{error}</p>}
    </div>
  );
}

export default FormRow;
