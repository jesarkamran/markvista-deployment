import { Plus } from "lucide-react";
import SearchQuery from "./SearchQuery";
import { Link } from "react-router-dom";
import BackButton from "@components/BackButton";
import { useLocation } from "react-router-dom";

function NavCommunity() {
  const location = useLocation();
  const showBack = location.pathname !== "/app/community";

  return (
    <div className="sticky top-0 z-10 border-b-2 border-black bg-white p-4 dark:border-white dark:bg-[var(--color-background)]">
      <div className="mx-auto flex max-w-4xl items-center space-x-4">
        {showBack && <BackButton />}
        <SearchQuery />
        <Link to="post-query" className="hover:opacity-25">
          <Plus className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}

export default NavCommunity;
