import ImagePreview from "@features/user/ImagePreview";
import Card from "@features/user/user-profile/Card";
import { getTimeDifference } from "@src/utils/formatter";
import { Link } from "react-router-dom";
import InteractionIcons from "./InteractionIcons";

function QueryCard({ query }) {
  return (
    <Card className="w-full">
      <div className="flex flex-col items-start gap-4 p-4 sm:flex-row">
        {/* Image - Responsive sizing */}
        <div className="flex-shrink-0 self-center sm:self-start">
          <div className="relative">
            {query.author.photo ? (
              <ImagePreview
                photo={query.author.photo}
                addStyles="h-20 w-20 sm:h-16 sm:w-16"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
                {query.author.name}
              </div>
            )}
          </div>
        </div>

        {/* Content - Responsive layout */}
        <div className="w-full flex-1 space-y-2">
          {/* Header - Responsive */}
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p className="text-sm font-medium">{query.author.name}</p>
            <span className="text-muted-foreground text-xs">
              {getTimeDifference(query.createdAt)}
            </span>
          </div>

          {/* Title - Responsive */}
          <Link to={`query/${query.id}`}>
            <h3 className="line-clamp-2 text-base font-semibold sm:text-lg">
              {query.title}
            </h3>
          </Link>

          {/* Description - Responsive */}
          <p className="text-muted-foreground line-clamp-3 text-sm sm:text-base">
            {query.description.slice(0, 150)}...
          </p>

          {/* Actions - Responsive */}
          {/* Like Action */}
          <InteractionIcons interaction={query} />
        </div>
      </div>
    </Card>
  );
}

export default QueryCard;
