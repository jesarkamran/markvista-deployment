function Card({ children }) {
  return (
    <div className="rounded-lg border border-gray-500 border-opacity-45 bg-white p-6 shadow-md dark:border-[var(--color-background)] dark:bg-[var(--color-section)]">
      {children}
    </div>
  );
}

export default Card;
