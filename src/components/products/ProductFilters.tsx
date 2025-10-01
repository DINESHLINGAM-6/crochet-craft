import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ProductFiltersProps {
  priceRange: number[];
  onPriceChange: (value: number[]) => void;
  selectedColor: string;
  onColorChange: (value: string) => void;
  selectedMaterial: string;
  onMaterialChange: (value: string) => void;
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  onClearFilters: () => void;
}

const COLORS = ["All", "Pink", "Red", "White", "Purple", "Yellow", "Rainbow", "Mixed"];
const MATERIALS = ["All", "Acrylic Yarn", "Cotton Yarn", "Wool", "Mixed"];

export const ProductFilters = ({
  priceRange,
  onPriceChange,
  selectedColor,
  onColorChange,
  selectedMaterial,
  onMaterialChange,
  inStockOnly,
  onInStockChange,
  onClearFilters
}: ProductFiltersProps) => {
  const hasActiveFilters = 
    priceRange[1] < 3000 || 
    selectedColor !== "All" || 
    selectedMaterial !== "All" || 
    inStockOnly;

  return (
    <div className="space-y-6 p-6 glass-effect rounded-2xl border-2 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-poppins font-bold">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">Price Range</Label>
          <Badge variant="secondary" className="font-mono">
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </Badge>
        </div>
        <Slider
          min={0}
          max={3000}
          step={50}
          value={priceRange}
          onValueChange={onPriceChange}
          className="py-2"
        />
      </div>

      {/* Color Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Color</Label>
        <Select value={selectedColor} onValueChange={onColorChange}>
          <SelectTrigger className="glass-effect border-2 hover:border-primary/30 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="glass-effect">
            {COLORS.map((color) => (
              <SelectItem key={color} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Material Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Material</Label>
        <Select value={selectedMaterial} onValueChange={onMaterialChange}>
          <SelectTrigger className="glass-effect border-2 hover:border-primary/30 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="glass-effect">
            {MATERIALS.map((material) => (
              <SelectItem key={material} value={material}>
                {material}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stock Filter */}
      <div className="flex items-center justify-between">
        <Label htmlFor="in-stock" className="text-sm font-semibold">
          In Stock Only
        </Label>
        <button
          id="in-stock"
          onClick={() => onInStockChange(!inStockOnly)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            inStockOnly ? "bg-primary" : "bg-muted"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              inStockOnly ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
};
