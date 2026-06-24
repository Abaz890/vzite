import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const homeTypeOptions = [
  { id: "apartment", label: "Apartment" },
  { id: "penthouse", label: "Penthouse" },
  { id: "shop", label: "Shop" },
  { id: "villa", label: "Villa" },
  { id: "townhouse", label: "Townhouse" },
  { id: "duplex", label: "Duplex" },
  { id: "hotel-apartment", label: "Hotel apartment" },
  { id: "land", label: "Land" },
  { id: "triplex", label: "Duplex" },
  { id: "show-room", label: "Show room" },
  { id: "suite", label: "Suite" },
  { id: "loft", label: "Loft" },
  { id: "full-floor", label: "Full floor" }
]

export function HomeTypeFilter({ value, onChange }: any) {
  const [open, setOpen] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState(value || [])

  const handleToggle = (typeId: any) => {
    setSelectedTypes((prev: any[]) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId)
      } else {
        return [...prev, typeId]
      }
    })
  }

  const handleApply = () => {
    onChange(selectedTypes)
    setOpen(false)
  }

  const handleClear = () => {
    setSelectedTypes([])
    onChange([])
    setOpen(false)
  }

  const getButtonLabel = () => {
    if (selectedTypes.length === 0) return "Home Type"
    if (selectedTypes.length === 1) {
      const selected = homeTypeOptions.find((option) => option.id === selectedTypes[0])
      return `${selected?.label || "Home Type"} (1)`
    }
    return `Home Type (${selectedTypes.length})`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
          {getButtonLabel()} <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-4" align="start">
        <div className="space-y-4">
          <h4 className="font-medium">Home Type</h4>

          <div className="space-y-2">
            {homeTypeOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedTypes.includes(option.id)}
                  onCheckedChange={() => handleToggle(option.id)}
                />
                <Label htmlFor={option.id} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
            <Button onClick={handleApply}>Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

