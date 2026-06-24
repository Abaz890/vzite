import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

const bedOptions = [0, 1, 2, 3, 4, 5, 6]
const bathOptions = [1, 2, 3, 4, 5, 6]

export function BedsAndBathsFilter({ onChange }: any) {
  const [open, setOpen] = useState(false)
  const [localBeds, setLocalBeds] = useState<number[]>([])
  const [localBaths, setLocalBaths] = useState<number[]>([])

  const handleApply = () => {
    onChange({
      beds: localBeds,
      baths: localBaths,
    })
    setOpen(false)
  }


  const handleToggleValue = (type: string, val: number) => {
    if (type === "beds") {
      setLocalBeds(prev => {
        return prev.includes(val)
          ? prev.filter(item => item !== val)
          : [...prev, val];
      });
    }

    if (type === "baths") {
      setLocalBaths(prev => {
        return prev.includes(val)
          ? prev.filter(item => item !== val)
          : [...prev, val];
      });
    }
  };


  const handleClear = () => {
    setLocalBeds([])
    setLocalBaths([])
    onChange({ beds: null, baths: null })
    setOpen(false)
  }

  // const getButtonLabel = () => {

  //   if (localBaths.length == 0 && localBeds.length == 0) return "Beds & Baths";

  //   const parts = [];
  //   if(localBaths.length == 1){
  //     //

  //   }
  //   else if (localBaths.length > 1) {
  //     parts.push(`${Math.min(...localBaths)} to ${Math.max(...localBaths)} Bedrooms`)
  //   }

  //   if(localBeds.length == 1) {
  //     parts.push(`${localBeds[0]} Bedrooms `)
  //   }
  //   else if (localBeds.length > 1) {
  //     parts.push(`${Math.min(...localBeds) == 0? 'Studio' : Math.min(...localBeds)} to ${Math.max(...localBeds)} Bathrooms`)
  //   }

  //   return parts.join(", ")
  // }


  const getButtonLabel = () => {
    // 1. Early exit if both arrays are empty
    if (!localBeds.length && !localBaths.length) {
      return "Beds & Baths";
    }

    const formatRange = (items: string | any[], suffix: string, mapZeroTo?: string) => {
      if (items.length === 0) return null;

      const sorted = [...items].sort((a, b) => a - b);
      const min = sorted[0];
      const max = sorted[sorted.length - 1];

      const formatVal = (val: number) => (val === 0 && mapZeroTo) ? mapZeroTo : val;

      if (items.length === 1 || min === max) {
        return `${formatVal(min)} ${suffix}`;
      }

      return `${formatVal(min)} - ${formatVal(max)} ${suffix}`;
    };

    const parts = [
      formatRange(localBeds, "Bedrooms", "Studio"),
      formatRange(localBaths, "Bathrooms")
    ];

    return parts.filter(Boolean).join(", ");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
          {getButtonLabel()} <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-4" align="start">
        <div className="space-y-4">
          <Tabs defaultValue="beds" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="beds">Bedrooms</TabsTrigger>
              <TabsTrigger value="baths">Bathrooms</TabsTrigger>
            </TabsList>
            <TabsContent value="beds" className="pt-4">
              <div className="grid grid-cols-3 gap-2">
                {bedOptions.map((option) => (
                  <Button
                    key={option}
                    variant={localBeds.includes(option) ? "default" : "outline"}
                    className="h-10"
                    onClick={() => handleToggleValue('beds', option)}
                  >
                    {option == 0 ? 'Studio' : option}
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="baths" className="pt-4">
              <div className="grid grid-cols-3 gap-2">
                {bathOptions.map((option) => (
                  <Button
                    key={option}
                    variant={localBaths.includes(option) ? "default" : "outline"}
                    className="h-10"
                    onClick={() => handleToggleValue('baths', option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>

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

