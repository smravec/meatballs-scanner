import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingDown } from "lucide-react";

interface Store {
  name: string;
  price: number;
  weight: string;
  pricePerKg: number;
  savings?: number;
  color: string;
}

const stores: Store[] = [
  {
    name: "Lidl",
    price: 3.99,
    weight: "500g",
    pricePerKg: 7.98,
    savings: 2.51,
    color: "hsl(210 85% 48%)",
  },
  {
    name: "K-Market",
    price: 4.99,
    weight: "500g",
    pricePerKg: 9.98,
    color: "hsl(150 60% 45%)",
  },
  {
    name: "Prisma",
    price: 5.49,
    weight: "500g",
    pricePerKg: 10.98,
    color: "hsl(25 95% 55%)",
  },
];

export const PriceResults = () => {
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
                      <Badge variant="default" className="bg-secondary text-secondary-foreground">
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
