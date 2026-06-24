import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
// import { deepEqual } from "@/lib/utils"

export function MoreFilter({ value, onChange } : any) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState(
    value || {
      features: [],
      yearBuilt: { min: "", max: "" },
      sqft: { min: "", max: "" },
      lotSize: { min: "", max: "" },
      daysOnMarket: 0,
    },
  )

  const handleFeatureToggle = (feature :any) => {
    setFilters((prev: { features: any[] }) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f: any) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const handleYearChange = (type: string, value: string) => {
    setFilters((prev: { yearBuilt: any }) => ({
      ...prev,
      yearBuilt: {
        ...prev.yearBuilt,
        [type]: value,
      },
    }))
  }

  const handleSqftChange = (type: string, value: string) => {
    setFilters((prev: { sqft: any }) => ({
      ...prev,
      sqft: {
        ...prev.sqft,
        [type]: value,
      },
    }))
  }

  const handleLotSizeChange = (type: string, value: string) => {
    setFilters((prev: { lotSize: any }) => ({
      ...prev,
      lotSize: {
        ...prev.lotSize,
        [type]: value,
      },
    }))
  }

  const handleDaysOnMarketChange = (value: any[]) => {
    setFilters((prev: any) => ({
      ...prev,
      daysOnMarket: value[0],
    }))
  }

  const handleApply = () => {
    onChange(filters)
    setOpen(false)
  }

  const handleClear = () => {
    const clearedFilters = {
      features: [],
      yearBuilt: { min: "", max: "" },
      sqft: { min: "", max: "" },
      lotSize: { min: "", max: "" },
      daysOnMarket: 0,
    }
    setFilters(clearedFilters)
    onChange(clearedFilters)
    setOpen(false)
  }

  const getButtonLabel = () => {
    const activeFilterCount = [
      filters.features.length > 0,
      filters.yearBuilt.min || filters.yearBuilt.max,
      filters.sqft.min || filters.sqft.max,
      filters.lotSize.min || filters.lotSize.max,
      filters.daysOnMarket > 0,
    ].filter(Boolean).length

    return activeFilterCount > 0 ? `More (${activeFilterCount})` : "More"
  }

  const features = [
    "Air Conditioning",
    "Balcony",
    "Elevator",
    "Fireplace",
    "Garage",
    "Garden",
    "Gym",
    "Hardwood Floors",
    "High Ceilings",
    "Parking",
    "Pet Friendly",
    "Pool",
    "Washer/Dryer",
    "Waterfront",
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
          {getButtonLabel()} <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="size">Size</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="p-4 max-h-[400px] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={`feature-${feature}`}
                    checked={filters.features.includes(feature)}
                    onCheckedChange={() => handleFeatureToggle(feature)}
                  />
                  <Label htmlFor={`feature-${feature}`} className="cursor-pointer text-sm">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="size" className="p-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Square Feet</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-sqft">Min</Label>
                    <Input
                      id="min-sqft"
                      type="number"
                      placeholder="No min"
                      value={filters.sqft.min}
                      onChange={(e) => handleSqftChange("min", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-sqft">Max</Label>
                    <Input
                      id="max-sqft"
                      type="number"
                      placeholder="No max"
                      value={filters.sqft.max}
                      onChange={(e) => handleSqftChange("max", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Lot Size (acres)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-lot">Min</Label>
                    <Input
                      id="min-lot"
                      type="number"
                      placeholder="No min"
                      value={filters.lotSize.min}
                      onChange={(e) => handleLotSizeChange("min", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-lot">Max</Label>
                    <Input
                      id="max-lot"
                      type="number"
                      placeholder="No max"
                      value={filters.lotSize.max}
                      onChange={(e) => handleLotSizeChange("max", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="year" className="p-4">
            <div className="space-y-4">
              <h4 className="font-medium">Year Built</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-year">Min</Label>
                  <Input
                    id="min-year"
                    type="number"
                    placeholder="No min"
                    value={filters.yearBuilt.min}
                    onChange={(e) => handleYearChange("min", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-year">Max</Label>
                  <Input
                    id="max-year"
                    type="number"
                    placeholder="No max"
                    value={filters.yearBuilt.max}
                    onChange={(e) => handleYearChange("max", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="other" className="p-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Days on Market</h4>
                <div className="space-y-6">
                  <Slider
                    defaultValue={[filters.daysOnMarket]}
                    max={90}
                    step={1}
                    onValueChange={handleDaysOnMarketChange}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Any</span>
                    <span>
                      {filters.daysOnMarket === 0
                        ? "Any"
                        : filters.daysOnMarket === 1
                          ? "1 day"
                          : `${filters.daysOnMarket} days`}
                    </span>
                    <span>90+ days</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <div className="flex justify-between p-4 border-t">
            <Button variant="outline" onClick={handleClear}>
              Clear All
            </Button>
            <Button onClick={handleApply}>Apply</Button>
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

