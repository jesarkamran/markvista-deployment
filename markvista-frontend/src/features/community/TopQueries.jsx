import Card from "@features/user/user-profile/Card";
import { Star, TrendingUp } from "lucide-react";

function TopQueries() {
  return (
    <>
      <Card>
        <div className="mb-5 flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-black dark:text-blue-600" />
          <h1 className="text-2xl font-semibold text-black dark:text-blue-600">
            Top Queries
          </h1>
        </div>
        <div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                  <Star className="h-4 w-4 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Best DeFi strategies for 2024</p>
                  <p className="text-muted-foreground text-sm">
                    <span className="font-semibold text-blue-700 dark:text-blue-400">
                      32 responses
                    </span>{" "}
                    •{" "}
                    <span className="font-semibold text-green-600">
                      128 upvotes
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}

export default TopQueries;
