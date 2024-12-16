import { useState } from "react";
import { Search } from "lucide-react";
import Input from "@components/ui/input";
import Button from "@components/Button";
import { useNavigate } from "react-router-dom";

function SearchQuery() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const handler = () => {
    if (!searchQuery) return;
    console.log(`Searching for ${searchQuery}`);
    setSearchQuery("");
    navigate(`search-results/${searchQuery}`);
  };

  // Handler for the Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handler();
    }
  };

  return (
    <div className="relative flex-1">
      <Input
        className="h-10 w-full pl-10"
        placeholder="Search queries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress} // Add the keydown event to trigger on Enter
      />
      <Button onClick={handler}>
        <Search className="text-muted-foreground absolute right-3 top-3 h-5 w-5" />
      </Button>
    </div>
  );
}

export default SearchQuery;
