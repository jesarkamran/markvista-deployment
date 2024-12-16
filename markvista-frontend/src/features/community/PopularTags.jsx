import Button from "@components/Button";
import Card from "@features/user/user-profile/Card";

function PopularTags() {
  return (
    <div className="sm:mb-5">
      <Card>
        <h1 className="mb-5 text-2xl font-semibold text-black dark:text-blue-600">
          Popular Tags
        </h1>
        <div className="flex flex-wrap gap-2">
          {[
            "Trading",
            "Analysis",
            "DeFi",
            "NFTs",
            "Security",
            "Blockchain",
          ].map((tag) => (
            <Tags key={tag} tag={tag}>
              tag
            </Tags>
          ))}
        </div>
      </Card>
    </div>
  );
}

const Tags = ({ tag }) => (
  <Button type="secondary" color="gray-300" colorDark="blue-700">
    {tag}
  </Button>
);
export default PopularTags;
