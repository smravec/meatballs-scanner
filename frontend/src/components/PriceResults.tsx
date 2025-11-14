import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";

interface Store {
  name: string;
  price: number;
  weight: string;
  pricePerKg: number;
  savings?: number;
  color: string;
}

interface StoreConfig {
  name: string;
  endpoint: string;
  weight: string;
  color: string;
}

const storeConfigs: StoreConfig[] = [
  {
    name: "Lidl",
    endpoint: "http://127.0.0.1:8000/lidl",
    weight: "500g",
    color: "hsl(210 85% 48%)",
  },
  {
    name: "K-Market",
    endpoint: "http://127.0.0.1:8000/kmarket",
    weight: "500g",
    color: "hsl(150 60% 45%)",
  },
  {
    name: "Prisma",
    endpoint: "http://127.0.0.1:8000/prisma",
    weight: "500g",
    color: "hsl(25 95% 55%)",
  },
];

export const PriceResults = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all(
          storeConfigs.map(async (config) => {
            const response = await fetch(config.endpoint);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${config.name} price`);
            }
            const data = await response.json();
            return { config, price: data["meatball-price"] };
          })
        );

        const storesData: Store[] = responses.map(({ config, price }) => {
          const weightInKg = parseFloat(config.weight) / 1000;
          const pricePerKg = price / weightInKg;
          return {
            name: config.name,
            price: price,
            weight: config.weight,
            pricePerKg: pricePerKg,
            color: config.color,
          };
        });

        // Sort by price (ascending)
        storesData.sort((a, b) => a.price - b.price);

        // Calculate savings compared to the highest price
        const maxPrice = Math.max(...storesData.map((s) => s.price));
        storesData.forEach((store) => {
          const savings = maxPrice - store.price;
          if (savings > 0) {
            store.savings = savings;
          }
        });

        setStores(storesData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch prices");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading prices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-destructive">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-muted-foreground">No prices available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Meatball Prices in Lahti
        </h2>
        <p className="text-muted-foreground">
          Showing {stores.length} results • Sorted by best price
        </p>
      </div>

      <div className="space-y-4">
        {stores.map((store, index) => (
          <Card
            key={store.name}
            className="p-6 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 cursor-pointer border-border animate-fade-in"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: "both",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: store.color }}
                >
                  {store.name[0]}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {store.name}
                    </h3>
                    {index === 0 && (
                      <Badge
                        variant="default"
                        className="bg-secondary text-secondary-foreground"
                      >
                        Best Price
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      Meatballs
                    </span>
                    <span>•</span>
                    <span>{store.weight}</span>
                    <span>•</span>
                    <span>€{store.pricePerKg.toFixed(2)}/kg</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold text-foreground mb-1">
                  €{store.price.toFixed(2)}
                </div>
                {store.savings && (
                  <div className="flex items-center gap-1 text-secondary text-sm font-medium">
                    <TrendingDown className="h-4 w-4" />
                    Save €{store.savings.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground text-center">
          💡 Prices are updated regularly. Actual in-store prices may vary.
        </p>
      </div>
    </div>
  );
};
