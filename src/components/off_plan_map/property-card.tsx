import { Card, CardContent } from "@/components/ui/card";
import { PropertyCarousel } from "./property-carousel";
import { useNavigate } from "react-router-dom";
import LazyImage from "../ui/lazyImage";

export function PropertyCard({ property, imgSrckey, onPropertyClick, carouselEnabled }: { property: any; imgSrckey: string; onPropertyClick?: () => void; carouselEnabled: boolean }) {
  let navigate = useNavigate();

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? "https://www.svgrepo.com/show/508699/landscape-placeholder.svg";
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow h-full" onClick={() => {
      if (property.type !== "offplan") {
        navigate(`/company/property/${property.reference_id}`);
      } else {
        onPropertyClick?.();
      }
    }}
    >
      <div className="min-h-[180px]">
        {
          carouselEnabled ?
            <PropertyCarousel imageSrcKey={imgSrckey} slides={property.media}></PropertyCarousel>
            :
            property.media.length > 0 ? <div>
              <LazyImage src={getNestedValue(property.media[0], imgSrckey)} alt={`Slide 1`} className={` aspect-[16/9] rounded-t-xl`} />
            </div> : <img className="w-full rounded-t-xl" src="https://placehold.co/380x200" />
        }
      </div>
      <CardContent className="p-2">
        <div className="space-y-1">
          <h4
            className="font-bold overflow-hidden text-ellipsis">
            {property.title ? property.title : "-"}
          </h4>
          <div className="flex justify-between items-start">
            <h5 className="font-semibold"></h5>
          </div>
          {property.type === "sale" || property.type === "rent" ? (
            <div className="flex items-center gap-2 text-sm" onClick={() => navigate(`/company/property/${property.reference_id}`)}>
              <span>{property?.meta?.bedrooms ?? "-"} bd</span>
              <span className="text-muted-foreground">|</span>
              <span>{property?.meta?.bedrooms ?? "-"} ba</span>
              {/* <span className="text-muted-foreground">|</span> */}
            </div>
          ) : null}
          <p className="text-sm">
            {property.emirate ? <span>{property.emirate.name} , </span> : "-,"}
            {property.district ? <span>{property.district.name}</span> : "-"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
