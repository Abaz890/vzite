import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

interface Property {
    id: string
    name: string
    thumbnail: string
    type: "off-plan" | "ready"
    price: string
    location: string
}

interface PropertySelectorProps {
    selectedProperty?: Property
    onPropertySelect: (property: Property | undefined) => void
}

const mockProperties: Property[] = [
    {
        id: "1",
        name: "Marina Heights Tower",
        thumbnail: "/placeholder.svg?height=80&width=80",
        type: "off-plan",
        price: "$450,000",
        location: "Dubai Marina",
    },
    {
        id: "2",
        name: "Downtown Luxury Residences",
        thumbnail: "/placeholder.svg?height=80&width=80",
        type: "off-plan",
        price: "$680,000",
        location: "Downtown Dubai",
    },
    {
        id: "3",
        name: "Palm Jumeirah Villas",
        thumbnail: "/placeholder.svg?height=80&width=80",
        type: "off-plan",
        price: "$1,200,000",
        location: "Palm Jumeirah",
    },
    {
        id: "4",
        name: "Business Bay Towers",
        thumbnail: "/placeholder.svg?height=80&width=80",
        type: "off-plan",
        price: "$520,000",
        location: "Business Bay",
    },
    {
        id: "5",
        name: "Jumeirah Beach Apartments",
        thumbnail: "/placeholder.svg?height=80&width=80",
        type: "off-plan",
        price: "$750,000",
        location: "Jumeirah Beach",
    },
    {
        id: "6",
        name: "Arabian Ranches Villas",
        thumbnail: "/placeholder.svg?height=80&width=80",
        type: "off-plan",
        price: "$890,000",
        location: "Arabian Ranches",
    },
]

export function PropertySelector({ selectedProperty, onPropertySelect }: PropertySelectorProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [showProperties, setShowProperties] = useState(false)

    const filteredProperties = mockProperties.filter(
        (property) =>
            property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handlePropertySelect = (property: Property) => {
        onPropertySelect(property)
        setShowProperties(false)
        setSearchTerm("")
    }

    const handleRemoveProperty = () => {
        onPropertySelect(undefined)
    }

    return (
        <div className="space-y-3">
            {selectedProperty ? (
                <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={selectedProperty.thumbnail || "/placeholder.svg"}
                                    alt={selectedProperty.name}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div>
                                    <div className="font-medium">{selectedProperty.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {selectedProperty.price} • {selectedProperty.location}
                                    </div>
                                    <Badge variant="outline" className="text-xs mt-1">
                                        {selectedProperty.type}
                                    </Badge>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleRemoveProperty}
                                className="text-red-600 hover:text-red-700"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search off-plan properties by name or location..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setShowProperties(e.target.value.length > 0)
                            }}
                            className="pl-10"
                        />
                    </div>

                    {showProperties && (
                        <div className="max-h-60 overflow-y-auto border rounded-lg bg-background">
                            {filteredProperties.length > 0 ? (
                                <div className="p-2 space-y-2">
                                    {filteredProperties.map((property) => (
                                        <Card
                                            key={property.id}
                                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                                            onClick={() => handlePropertySelect(property)}
                                        >
                                            <CardContent className="p-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={property.thumbnail || "/placeholder.svg"}
                                                        alt={property.name}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="font-medium text-sm">{property.name}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {property.price} • {property.location}
                                                        </div>
                                                        <Badge variant="outline" className="text-xs mt-1">
                                                            {property.type}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 text-center text-muted-foreground text-sm">
                                    No properties found matching "{searchTerm}"
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
