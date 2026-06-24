import companyPropertyRepository from "@/repositories/company/companyPropertyRepository";
import { BedsAndBathsFilter } from "@/components/off_plan_map/filters/beds-baths-filter";
import { PriceFilter } from "@/components/off_plan_map/filters/price-filter";
import { SizeFilter } from "@/components/off_plan_map/filters/size-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SelectDynamic } from "@/components/ui/selectDynamic";
import { usePropertyState } from "@/providers/propertyContext";
import { deepEqual } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HomeTypeFilter } from "./off_plan_map/filters/home-type-filter";

export default function PropertyFilter() {
  const { filters, setFilters } = usePropertyState();
  const [inputValue, setInputValue] = useState(filters.name);
  const [isLoading,] = useState(false);

  // { filters, onFilterUpdated }: { filters: FiltersType; onFilterUpdated: (filter: FiltersType) => void }


  const fetchEmirates = async function () {
    console.log('fetch emirate called on prop filter')
    const response = await companyPropertyRepository.getEmirates("mini");
    return {
      data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.id.toString(), center: item.center.coordinates })) : [],
      lastPage: response.success ? response.data.last_page : 1,
    };
  };

  const fetchDistricts = async function (page: number, query: string, limit: number) {
    console.log('fetch district called on prop filter')
    const response = await companyPropertyRepository.getDistricts(page, query, filters.emirate_id, "mini", limit);
    return {
      data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.id.toString(), center: item.center.coordinates })) : [],
      lastPage: response.success ? response.data.last_page : 1,
    };
  };

  const fetchDeveloper = async function (page: number, query: string) {
    console.log('fetch developer called on prop filter')
    const response = await companyPropertyRepository.getDevelopers(page, query);
    // setDistricts(response.data.data);
    return {
      data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.id.toString(), center: null })) : [],
      lastPage: response.success ? response.data.last_page : 1,
    };
  };

  const handleLocationChange = (type: "emirate" | "district", center: [number, number] | null) => {
    //set center and set zoom
    console.log(type, center);
  };

  const handleFilterChange = (filterType: string, value: any) => {
    const updatedFilters = {
      ...filters,
      [filterType]: value,
    };
    if (!deepEqual(filters, updatedFilters)) {
      setFilters(updatedFilters);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleFilterChange("name", inputValue);
    }, 350);

    return () => clearTimeout(timeout);
  }, [inputValue]);


  //   const handleRemoveFilter = (filterType: any, defaultValue: any) => {
  //     setFilters((prev: any) => ({
  //       ...prev,
  //       [filterType]: defaultValue,
  //     }));
  //   };

  return (
    <>
      <div className="relative  mb-4">
        <div className="flex items-center border rounded-md overflow-hidden bg-white">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="border-0 pl-10 h-12"
              placeholder="Enter an address, neighborhood, city, or ZIP code"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} />
            {filters.name && (
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <X className="h-4 w-4 text-muted-foreground" onClick={()=>{ setInputValue('') }} />
              </button>
            )}
          </div>
          <Button className="rounded-none h-12 px-6">Search</Button>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 me-2" >
          {/* <SaleStatusFilter value={filters.saleStatus} onChange={(value: any) => handleFilterChange("saleStatus", value)} /> */}
          <HomeTypeFilter value={filters.homeTypes} onChange={(value: any) => handleFilterChange("homeTypes", value)} />
          <PriceFilter value={filters.price} onChange={(value: any) => handleFilterChange("price", value)} />
          <SizeFilter value={filters.size} onChange={(value: any) => handleFilterChange("size", value)}></SizeFilter>
          <BedsAndBathsFilter value={filters.bedsAndBaths} onChange={(value: any) => handleFilterChange("bedsAndBaths", value)} />
          <SelectDynamic
            name="emirate"
            field={{ value: filters.emirate_id }}
            onChange={(value, center) => {
              handleLocationChange("emirate", center!);
              handleFilterChange("emirate_id", value);
            }}
            fetchOptions={async () => await fetchEmirates()}
            disabled={isLoading}
          />
          <SelectDynamic
            name="district"
            field={{ value: filters.district_id }}
            onChange={(value, center) => {
              handleLocationChange("district", center!);
              handleFilterChange("district_id", value);
            }}
            fetchOptions={async (page, query) => await fetchDistricts(page, query, 12)}
            disabled={isLoading || !filters.emirate_id}
          />

          <SelectDynamic
            name="developer"
            field={{ value: filters.developer_id }}
            onChange={(value) => {
              handleFilterChange("developer_id", value);
            }}
            fetchOptions={async (page, query) => await fetchDeveloper(page, query)}
            disabled={isLoading}
          />
          {/*  <MoreFilter value={filters.more} onChange={(value: any) => handleFilterChange("more", value)} /> */}
        </div>
        <div>
          <Select
            defaultValue={filters.orderBy}
            value={filters.orderBy}
            onValueChange={(value) => { handleFilterChange("orderBy", value) }}
          >
            <SelectTrigger className="w-[200px] bg-white font-medium">
              <SelectValue placeholder="Order By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="location">Order By Location</SelectItem>
                <SelectItem value="name">Order By Name</SelectItem>
                <SelectItem value="created_at">Order By Newly Created</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* <Button variant="ghost" className="flex items-center gap-2">
          Sort: Location
          <ChevronDown className="h-4 w-4" />
        </Button> */}
      </div>
    </>
  );
}
