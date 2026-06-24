import { useState, useEffect, forwardRef, useRef } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';

// Define the shape of an option
type Option = { id: number; label: string; value: string; };
export type FetchResult = { data: Option[]; lastPage: number; };

interface MultiSelectDynamicProps {
  name?: string;
  placeholder?: string;
  defaultValues?: Option[];
  fetchPropsOnInit?: boolean;
  onChange: (selected: Option[]) => void;
  addOption: (name: string) => Promise<Option>;
  fetchOptions: (page: number, query: string) => Promise<FetchResult>;
}

export const MultiSelectDynamic = forwardRef<HTMLButtonElement, MultiSelectDynamicProps>(({
  name,
  placeholder = 'Select...',
  defaultValues = [], 
  onChange,
  addOption,
  fetchOptions,
}, ref) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<Option[]>(defaultValues);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debounce = (fn: Function, delay = 300) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const loadOptions = async (pageNum: number, search: string) => {
    setIsLoading(true);
    try {
      const result = await fetchOptions(pageNum, search);
      setOptions(prev => pageNum > 1 ? [...prev, ...result.data] : result.data);
      setLastPage(result.lastPage);
    } finally {
      setIsLoading(false);
    }
  };


  const debouncedFetch = useRef(debounce((query: string) => {
    loadOptions(1, query);
  }, 600)).current;

  useEffect(() => {
    setPage(1);
    if (query.length > 0) {
      debouncedFetch(query)
    }
  }, [query]);

  // useEffect(() => {
  //   if (page > 1) loadOptions(page, query);
  // }, [page, query, loadOptions]);

  // const debouncedSearch = useCallback(
  //   debounce((val: string) => setQuery(val)),
  //   []
  // );

  const toggleSelect = (option: Option) => {
    setSelected(prev => {
      const exists = prev.some(item => item.id === option.id);
      const updated = exists ? prev.filter(item => item.id !== option.id) : [...prev, option];
      onChange?.(updated);
      return updated;
    });
  };

  const handleAddOption = async () => {
    if (!query) return; 
    const newOpt = await addOption(query);
    setOptions(prev => [newOpt, ...prev]);
    setSelected(prev => {
      const updated = [...prev, newOpt];
      onChange?.(updated);
      return updated;
    });
    setQuery('');
  };

  return (
    <Popover open={open} onOpenChange={(open) => { loadOptions(0, ''), setOpen(open) }}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between flex-wrap"
          name={name}
        >
          {selected.length > 0
            ? selected.map(item => item.label).join(', ')
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search..."
            value={query}
            onValueChange={(val) => setQuery(val)}
            className="h-10 px-3"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {query && !options.some(o => o.label === query) && (
              <CommandItem onSelect={handleAddOption} className="text-primary cursor-pointer justify-center">
                Add "{query}"
              </CommandItem>
            )}
            <CommandGroup>
              {options.map((option, key) => (
                <CommandItem key={key} onSelect={() => toggleSelect(option)}>
                  <Checkbox
                    checked={selected.some(item => item.id === option.id)}
                    className="mr-2"
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {page < lastPage && (
            <div className="flex justify-center p-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setPage(prev => prev + 1)}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load more'}
              </Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
});

MultiSelectDynamic.displayName = 'MultiSelectDynamic';
