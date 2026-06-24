import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function PriceFilter({ value, onChange } :any) {
  const [open, setOpen] = useState(false)
  const [minPrice, setMinPrice] = useState(value?.min || "")
  const [maxPrice, setMaxPrice] = useState(value?.max || "")

  const handleApply = () => {
    onChange({
      min: minPrice ? Number.parseInt(minPrice) : undefined,
      max: maxPrice ? Number.parseInt(maxPrice) : undefined,
    })
    setOpen(false)
  }

  const handleClear = () => {
    setMinPrice("")
    setMaxPrice("")
    onChange({ min: undefined, max: undefined })
    setOpen(false)
  }

  const getButtonLabel = () => {
    // if (!value?.min && !value?.max) return "Price"
    // if (value?.min && !value?.max) return `${value.min}+`
    // if (!value?.min && value?.max) return `Up to $${value.max}`
    return `Price ${value.min !== undefined ? `${parseFloat(value.min).toLocaleString()} AED` : ''} ${value.max !== undefined ? `to ${parseFloat(value.max).toLocaleString()} AED` : ''  }`;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
          {getButtonLabel()} <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] p-4" align="start">
        <div className="space-y-4">
          <h4 className="font-medium">Price Range</h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-price">Minimum</Label>
              <div className="relative">
                <Input
                  id="min-price"
                  type="number"
                  placeholder="No min"
                  className="pe-8"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">AED</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-price">Maximum</Label>
              <div className="relative">
                <Input
                  id="max-price"
                  type="number"
                  placeholder="No max"
                  className="pe-8"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">AED</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
            <Button onClick={handleApply} disabled={!(minPrice && maxPrice)} >Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

