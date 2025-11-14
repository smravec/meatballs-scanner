import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { LoadingStores } from "@/components/LoadingStores";
import { PriceResults } from "@/components/PriceResults";

const Index = () => {
  const [stage, setStage] = useState<"search" | "loading" | "results">("search");

  const handleSearch = () => {
    setStage("loading");
  };

  const handleLoadingComplete = () => {
    setStage("results");
  };

  const handleNewSearch = () => {
    setStage("search");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🥩</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">MeatBALLS Scanner</h1>
              <p className="text-sm text-primary-foreground/80">
                Compare meatball prices across stores
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {stage === "search" && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Find the Best Meatball Deals
              </h2>
              <p className="text-lg text-muted-foreground">
                Compare prices from Prisma, K-Market, and Lidl in seconds
              </p>
            </div>
            <SearchBar onSearch={handleSearch} isLoading={false} />
          </div>
        )}

        {stage === "loading" && (
          <div className="animate-fade-in">
            <LoadingStores onComplete={handleLoadingComplete} />
          </div>
        )}

        {stage === "results" && (
          <div className="space-y-6 animate-fade-in">
            <button
              onClick={handleNewSearch}
              className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 transition-colors"
            >
              ← New Search
            </button>
            <PriceResults />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>MeatBALLS Scanner • Helping you save on meatballs since 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
