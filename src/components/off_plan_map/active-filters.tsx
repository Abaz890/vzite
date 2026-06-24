import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


const homeTypeOptions : Record<"house" | "condo" | "townhouse" | "multi-family" | "apartment" | "land" | "other", string> = {
  house: "House",
  condo: "Condo",
  townhouse: "Townhouse",
  "multi-family": "Multi-family",
  apartment: "Apartment",
  land: "Land",
  other: "Other",
}

interface Filters {
  homeTypes: (keyof typeof homeTypeOptions)[];
} 


export function ActiveFilters({ filters, onRemove, onClearAll } : { filters : any, onRemove : any, onClearAll : any }) {
  const hasActiveFilters = () => {
    return (
      filters.saleStatus !== "for-sale" ||
      filters.price.min !== undefined ||
      filters.price.max !== undefined ||
      filters.bedsAndBaths.beds !== "Any" ||
      filters.bedsAndBaths.baths !== "Any" ||
      filters.homeTypes.length > 0 ||
      filters.more.features.length > 0 ||
      filters.more.yearBuilt.min ||
      filters.more.yearBuilt.max ||
      filters.more.sqft.min ||
      filters.more.sqft.max ||
      filters.more.lotSize.min ||
      filters.more.lotSize.max ||
      filters.more.daysOnMarket > 0
    )
  }

  if (!hasActiveFilters()) return null

  const renderFilterBadges = () => {
    const badges = []

    // Sale Status
    if (filters.saleStatus !== "for-sale") {
      const label = filters.saleStatus === "for-rent" ? "For Rent" : filters.saleStatus === "sold" ? "Sold" : "Pending"
      badges.push(
        <Badge key="sale-status" variant="secondary" className="flex items-center gap-1">
          {label}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemove("saleStatus", "for-sale")}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {label} filter</span>
          </Button>
        </Badge>,
      )
    }

    // Price
    if (filters.price.min !== undefined || filters.price.max !== undefined) {
      let label = ""
      if (filters.price.min !== undefined && filters.price.max !== undefined) {
        label = `$${filters.price.min.toLocaleString()} - $${filters.price.max.toLocaleString()}`
      } else if (filters.price.min !== undefined) {
        label = `$${filters.price.min.toLocaleString()}+`
      } else if (filters.price.max !== undefined) {
        label = `Up to $${filters.price.max.toLocaleString()}`
      }

      badges.push(
        <Badge key="price" variant="secondary" className="flex items-center gap-1">
          {label}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemove("price", { min: undefined, max: undefined })}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove price filter</span>
          </Button>
        </Badge>,
      )
    }

    // Beds & Baths
    if (filters.bedsAndBaths.beds !== "Any" || filters.bedsAndBaths.baths !== "Any") {
      const parts = []
      if (filters.bedsAndBaths.beds !== "Any") parts.push(`${filters.bedsAndBaths.beds} Beds`)
      if (filters.bedsAndBaths.baths !== "Any") parts.push(`${filters.bedsAndBaths.baths} Baths`)

      badges.push(
        <Badge key="beds-baths" variant="secondary" className="flex items-center gap-1">
          {parts.join(", ")}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemove("bedsAndBaths", { beds: "Any", baths: "Any" })}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove beds and baths filter</span>
          </Button>
        </Badge>,
      )
    }

    // Home Types
    if (filters.homeTypes.length > 0) {

      const filters: Filters = { homeTypes: ["house", "condo"] };

      const label =
        filters.homeTypes.length === 1
          ? homeTypeOptions[filters.homeTypes[0]]
          : `${filters.homeTypes.length} Home Types`;
      

      badges.push(
        <Badge key="home-types" variant="secondary" className="flex items-center gap-1">
          {label}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemove("homeTypes", [])}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove home types filter</span>
          </Button>
        </Badge>,
      )
    }

    // More Filters

    // Features
    if (filters.more.features.length > 0) {
      const label =
        filters.more.features.length === 1 ? filters.more.features[0] : `${filters.more.features.length} Features`

      badges.push(
        <Badge key="features" variant="secondary" className="flex items-center gap-1">
          {label}
          <Button
            variant="ghost"
            size="icon" 
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => {
              const newMore = { ...filters.more, features: [] }
              onRemove("more", newMore)
            }}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove features filter</span>
          </Button>
        </Badge>,
      )
    }

    // Year Built
    if (filters.more.yearBuilt.min || filters.more.yearBuilt.max) {
      let label = ""
      if (filters.more.yearBuilt.min && filters.more.yearBuilt.max) {
        label = `Built ${filters.more.yearBuilt.min} - ${filters.more.yearBuilt.max}`
      } else if (filters.more.yearBuilt.min) {
        label = `Built after ${filters.more.yearBuilt.min}`
      } else if (filters.more.yearBuilt.max) {
        label = `Built before ${filters.more.yearBuilt.max}`
      }

      badges.push(
        <Badge key="year-built" variant="secondary" className="flex items-center gap-1">
          {label}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => {
              const newMore = { ...filters.more, yearBuilt: { min: "", max: "" } }
              onRemove("more", newMore)
            }}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove year built filter</span>
          </Button>
        </Badge>,
      )
    }

    // Square Feet
    if (filters.more.sqft.min || filters.more.sqft.max) {
      let label = ""
      if (filters.more.sqft.min && filters.more.sqft.max) {
        label = `${filters.more.sqft.min} - ${filters.more.sqft.max} sqft`
      } else if (filters.more.sqft.min) {
        label = `${filters.more.sqft.min}+ sqft`
      } else if (filters.more.sqft.max) {
        label = `Up to ${filters.more.sqft.max} sqft`
      }

      badges.push(
        <Badge key="sqft" variant="secondary" className="flex items-center gap-1">
          {label}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => {
              const newMore = { ...filters.more, sqft: { min: "", max: "" } }
              onRemove("more", newMore)
            }}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove square feet filter</span>
          </Button>
        </Badge>,
      )
    }

    // Lot Size
    if (filters.more.lotSize.min || filters.more.lotSize.max) {
      let label = ""
      if (filters.more.lotSize.min && filters.more.lotSize.max) {
        label = `${filters.more.lotSize.min} - ${filters.more.lotSize.max} acres`
      } else if (filters.more.lotSize.min) {
        label = `${filters.more.lotSize.min}+ acres`
      } else if (filters.more.lotSize.max) {
        label = `Up to ${filters.more.lotSize.max} acres`
      }

      badges.push(
        <Badge key="lot-size" variant="secondary" className="flex items-center gap-1">
          {label}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => {
              const newMore = { ...filters.more, lotSize: { min: "", max: "" } }
              onRemove("more", newMore)
            }}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove lot size filter</span>
          </Button>
        </Badge>,
      )
    }

    // Days on Market
    if (filters.more.daysOnMarket > 0) {
      const label = filters.more.daysOnMarket === 1 ? "1 day on market" : `${filters.more.daysOnMarket} days on market`

      badges.push(
        <Badge key="days-on-market" variant="secondary" className="flex items-center gap-1">
          {label}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => {
              const newMore = { ...filters.more, daysOnMarket: 0 }
              onRemove("more", newMore)
            }}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove days on market filter</span>
          </Button>
        </Badge>,
      )
    }

    return badges
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-2 mb-4">
      <div className="flex flex-wrap gap-2">{renderFilterBadges()}</div>
      <Button variant="ghost" size="sm" className="text-sm" onClick={onClearAll}>
        Clear All
      </Button>
    </div>
  )
}

