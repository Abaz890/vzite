import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function SizeFilter({ value, onChange } :any) {
  const [open, setOpen] = useState(false)
  const [minSize, setMinSize] = useState(value?.min || "")
  const [maxSize, setMaxSize] = useState(value?.max || "")

  const handleApply = () => {
    onChange({
      min: minSize ? Number.parseInt(minSize) : undefined,
      max: maxSize ? Number.parseInt(maxSize) : undefined,
    })
    setOpen(false)
  }

  const handleClear = () => {
    setMinSize("")
    setMaxSize("")
    onChange({ min: undefined, max: undefined })
    setOpen(false)
  }

  const getButtonLabel = () => {
    // if (!value?.min && !value?.max) return "Size"
    // if (value?.min && !value?.max) return `${value.min}+`
    // if (!value?.min && value?.max) return `Up to ${value.max} SQFT`
    // return `${value.min} - ${value.max}`
    return `Size ${value.min !== undefined ? `${value.min} Sqft` : ''} ${value.max !== undefined ? `to ${value.max} Sqft` : ''  }`;
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
          <h4 className="font-medium">Size Range</h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-size">Minimum</Label>
              <div className="relative">
                <Input
                  id="min-size"
                  type="number"
                  placeholder="No min"
                  className="pe-8"
                  value={minSize}
                  onChange={(e) => setMinSize(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">sqft</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-size">Maximum</Label>
              <div className="relative">
                <Input
                  id="max-size"
                  type="number"
                  placeholder="No max"
                  className="pe-8"
                  min={minSize}
                  value={maxSize}
                  onChange={(e) => setMaxSize(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">sqft</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
            <Button onClick={handleApply}  disabled={!(minSize && maxSize)} >Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

