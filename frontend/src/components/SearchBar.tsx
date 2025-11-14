import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: () => void;
  isLoading: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("Lahti");

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-xl shadow-[var(--shadow-card)] p-6 border border-border">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              City
            </label>
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="w-full"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Currently supporting: Lahti (more cities coming soon!)
            </p>
          </div>
          
          <Button
            onClick={onSearch}
            disabled={isLoading || city !== "Lahti"}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 transition-opacity"
            size="lg"
          >
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? "Searching..." : "Search Meatball Prices"}
          </Button>
        </div>
      </div>
    </div>
  );
};
