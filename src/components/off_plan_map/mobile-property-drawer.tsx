import { useState, useEffect } from "react"
import { ChevronUp, MapPin } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button" 
import { Separator } from "@/components/ui/separator"
import { PropertyCard } from "./property-card"

export function MobilePropertyDrawer({ properties, isOpen, setIsOpen } : any) {
  const [expanded, setExpanded] = useState(false)

  // Close drawer when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [setIsOpen])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="bottom" className={`p-0 ${expanded ? "h-[80vh]" : "h-[40vh]"}`}>
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 py-2 flex flex-row items-center justify-between border-b">
            <Button
              variant="ghost"
              size="sm"
              className="w-full flex items-center justify-center"
              onClick={() => setExpanded(!expanded)}
            >
              <ChevronUp className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </Button>
          </SheetHeader>

          <div className="p-4">
            <SheetTitle className="text-xl">{properties.length} Properties Found</SheetTitle>
            <p className="text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 inline mr-1" />
              Showing properties in current map view
            </p>
          </div>

          <Separator />

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {properties.map((property: any) => (
              <PropertyCard
              carouselEnabled={false}
              imgSrckey="upload.src"
                key={property.id}
                property={property}
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

