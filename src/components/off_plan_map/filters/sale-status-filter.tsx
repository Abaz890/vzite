import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const saleStatusOptions = [
  { value: "for-sale", label: "For Sale" },
  { value: "for-rent", label: "For Rent" },
  { value: "sold", label: "Sold" },
  { value: "pending", label: "Pending & Under Contract" },
]

export function SaleStatusFilter({ value, onChange } : any) {
  const [open, setOpen] = useState(false)

  const handleSelect = (value: any) => {
    onChange(value)
    setOpen(false)
  }

  const selectedOption = saleStatusOptions.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
          {selectedOption?.label || "For Sale"} <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-4" align="start">
        <RadioGroup value={value} onValueChange={handleSelect}>
          {saleStatusOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2 py-1">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  )
}

