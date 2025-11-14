import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const stores = ["Prisma", "K-Market", "Lidl"];

interface LoadingStoresProps {
  onComplete: () => void;
}

export const LoadingStores = ({ onComplete }: LoadingStoresProps) => {
  const [currentStore, setCurrentStore] = useState(0);

  useEffect(() => {
    if (currentStore < stores.length) {
      const timer = setTimeout(() => {
        setCurrentStore((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(onComplete, 500);
      return () => clearTimeout(completeTimer);
    }
  }, [currentStore, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-xl shadow-[var(--shadow-card)] p-8 border border-border">
        <div className="flex flex-col items-center gap-6">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Fetching prices...
            </h3>
            <p className="text-sm text-muted-foreground">
              Comparing prices across stores in Lahti
            </p>
          </div>

          <div className="w-full space-y-3">
            {stores.map((store, index) => (
              <div
                key={store}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  index < currentStore
                    ? "bg-secondary/10 border border-secondary/30"
                    : index === currentStore
                    ? "bg-primary/10 border border-primary/30 animate-pulse"
                    : "bg-muted/50 border border-border"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    index < currentStore
                      ? "bg-secondary text-secondary-foreground"
                      : index === currentStore
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index < currentStore ? (
                    <span className="text-xs">✓</span>
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <span
                  className={`font-medium transition-colors ${
                    index <= currentStore ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {store}
                </span>
                {index === currentStore && (
                  <Loader2 className="ml-auto h-4 w-4 text-primary animate-spin" />
                )}
                {index < currentStore && (
                  <span className="ml-auto text-xs text-secondary font-medium">
                    Complete
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
