import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty } from "@/components/ui/command";
import { ChevronDown, Search, X } from "lucide-react";
import { debounce } from "@/lib/utils";
import LazyImage from "./lazyImage";

interface Option {
  id: string | number;
  label: string;
  value: string;
  thumbnail?: string;
  center?: [number, number];
}

interface SelectDynamicProps {
  name: string;
  fetchOptions: (page: number, query: string) => Promise<{ data: Option[]; lastPage: number }>;
  defaultValue?: { label: string; value: string };
  onChange: (value: string, center?: [number, number]) => void;
  disabled?: boolean;
  showThumbnail?: boolean;
  fetchPropsOnInit?: boolean;
  field: any;
}

export function SelectDynamic({
  name,
  fetchOptions,
  defaultValue,
  onChange,
  disabled = false,
  fetchPropsOnInit = false,
  showThumbnail = false,
  field
}: SelectDynamicProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  const selectedValueRef = useRef<string | null>("");



  useEffect(() => {
    if (fetchPropsOnInit) {
      loadOptions(1, "");
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setOptions([]);
      setPage(1);
      loadOptions(1, searchQuery);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const loadOptions = async (pageToLoad: number, query: string) => {
    if (isLoading || pageToLoad > lastPage) return;
    setIsLoading(true);
    try { 
      const response = await fetchOptions(pageToLoad, query);
      setOptions((prev) => {
        const unique = new Map(prev.map((item) => [item.id, item]));
        response.data.forEach((item) => unique.set(item.id, item));
        return Array.from(unique.values());
      });
      setLastPage(response.lastPage);
      setPage(pageToLoad);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    console.log("loading page", page + 1);
    if (!isLoading && page < lastPage) {
      loadOptions(page + 1, searchQuery);
    }
  }, [isLoading, page, lastPage, searchQuery, loadOptions]);

  const debouncedLoadMore = useMemo(
    () => debounce(loadMore, 300),
    [loadMore],
  );

  useEffect(() => {
    return () => debouncedLoadMore.cancel?.();
  }, [debouncedLoadMore]);


  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      debouncedLoadMore();
    }
  };

  const selectedOption = options.find((opt) => opt.value === field.value);

  return (
    <Popover
      open={open}
      modal={true}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          setSearchQuery("");
          setOptions([]);
          setPage(1);
          loadOptions(1, "");
          setOpen(true);
          setTimeout(() => setOpen(undefined), 0);
        }
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className="w-full flex items-center justify-between gap-2 border px-2 py-2 rounded-md bg-white text-sm font-medium disabled:opacity-65"
        >
          <div className="text-start truncate">
            {selectedOption?.label || defaultValue?.label || `Select ${name}`}
          </div>
          {!selectedOption?.value ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <X
              className="h-4 w-4"
              onClick={() => onChange("")}
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" side="bottom" align="start">
        <Command>
          <div className="flex items-center p-2 border-b bg-white sticky top-0 z-10">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <CommandInput
              placeholder="Search..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="w-full"
              autoFocus
            />
          </div>
          <CommandList onScrollCapture={handleScroll} className="max-h-60 overflow-auto">
            {options.length > 0 ? (
              options.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.label}
                  onSelect={() => {
                    selectedValueRef.current = item.value;
                    onChange(item.value, item.center);
                    setOpen(false);
                  }}
                >
                  {
                    showThumbnail ?
                      <LazyImage width={`80px`} src={item.thumbnail!} alt={item.label} className={` aspect-[16/9] rounded-sm`} />
                      :
                      <></>
                  }
                  <div className="ms-1">
                    {item.label.length > 0 ? item.label : '-'}
                  </div>
                </CommandItem>
              ))
            ) : isLoading ? (
              <div className="text-center py-2 text-sm text-gray-500">Loading...</div>
            ) : (
              <CommandEmpty>No results found</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
