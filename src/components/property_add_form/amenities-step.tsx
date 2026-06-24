import type { UseFormReturn } from "react-hook-form"; 
import { FormField, FormItem } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import companyPropertyRepository from "@/repositories/company/companyPropertyRepository";
import { Skeleton } from "../ui/skeleton";
import LazyImage from "../ui/lazyImage";

 
export default function AmenitiesStep({ form }: { form: UseFormReturn<any> }) {
  const [isLoading, setIsLoading] = useState(true);
  const [amenities, setAmenities] = useState([]);

  const fetchAmenities = async function () {
    setIsLoading(true);
    const response = await companyPropertyRepository.getAmenities();
    if (response.success) {
      setAmenities(response.data);
    }

    setIsLoading(false);
  };



  useEffect(() => {
    fetchAmenities(); 
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Amenities</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem> 
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {isLoading ? (
                  
                    <div className="space-y-4 col-span-4 ">  
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 20 }).map((_, index) => (
                          <Skeleton key={index} className="h-16 rounded-md border border-gray-200">
                            <div className="flex items-center p-4 gap-3">
                              <Skeleton className="h-6 w-6 rounded-md" />
                              <Skeleton className="h-4 w-24" />
                            </div>
                          </Skeleton>
                        ))}
                      </div>
                    </div>
                  
                ) : amenities.length > 0 ? (
                  amenities.map((amenity : any) => {
                    const isSelected = field.value?.includes(amenity.id);
                    return (
                      <div
                        key={amenity.id}
                        className={`flex flex-row items-center space-x-3 rounded-md border p-4 cursor-pointer transition-all ${isSelected ? "bg-primary text-primary-foreground border-primary" : ""}`}
                        onClick={() => {
                          const currentValues = field.value || [];
                          if (isSelected) {
                            field.onChange(currentValues.filter((value: string) => value !== amenity.id));
                          } else {
                            field.onChange([...currentValues, amenity.id]);
                          }
                        }}
                      >
                        <LazyImage src={amenity.icon} width={26} className={`h-5 w-5 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`}  alt={amenity.name} ></LazyImage>
                        <div className="font-medium leading-none">{amenity.name}</div>
                        <input type="checkbox" checked={isSelected} className="hidden" onChange={() => {}} />
                      </div>
                    );
                  })
                ) : (
                  <>no data found</>
                )}
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
