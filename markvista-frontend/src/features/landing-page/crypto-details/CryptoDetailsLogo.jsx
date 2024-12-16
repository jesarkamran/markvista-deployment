function CryptoDetailsLogo({ data }) {
  return (
    <div className="flex w-full items-center">
      <img
        className="mx-1.5 h-[3rem] w-[3rem]"
        src={data.image.large}
        alt={data.id}
      />
      <h1 className="text-xl font-medium capitalize">{data.name}</h1>
      <span className="ml-2 rounded bg-blue-700 bg-opacity-25 px-2.5 py-0.5 text-sm uppercase text-blue-500">
        {data.symbol}
      </span>
    </div>
  );
}

export default CryptoDetailsLogo;
