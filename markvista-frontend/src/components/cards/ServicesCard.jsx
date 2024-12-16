function ServicesCard({ serviceName, serviceDesc, serviceIcon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-4 py-5 shadow-lg dark:border-[var(--color-background)] dark:bg-[var(--color-section)]">
      <div className="px-1 pb-2">
        <div className="mb-2 flex flex-col items-start">
          <div className="m-2 flex text-slate-800 dark:text-slate-100">
            <Icon className="text-2xl text-blue-600 dark:text-blue-700" />
            <h2 className="mx-2 text-xl font-semibold">{serviceName}</h2>
          </div>
          <h2 className="mx-4 text-sm font-medium text-gray-500 dark:text-gray-300">
            {serviceDesc}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ServicesCard;
