const RankItem = ({ label, value }) => (
  <h3 className="py-1">
    <span className="mr-1 capitalize">{label}</span>
    {value}
  </h3>
);

const RankSection = ({ data }) => (
  <div className="mt-4 flex flex-col">
    {data.market_cap_rank && (
      <RankItem label="market cap rank:" value={data.market_cap_rank} />
    )}
    {data.coingecko_rank && (
      <RankItem label="coinGecko rank:" value={data.coingecko_rank} />
    )}{" "}
    {data.coingecko_score && (
      <RankItem label="coinGecko score:" value={data.coingecko_score} />
    )}
  </div>
);

export default RankSection;
