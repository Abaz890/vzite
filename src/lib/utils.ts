import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export type DebouncedFn = ((...args: any[]) => void) & { cancel: () => void };

export function getAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${path.replace(/^\//, '')}`
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const colorsRepo = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Red", value: "#EF4444" },
  { name: "Green", value: "#10B981" },
  { name: "Yellow", value: "#F59E0B" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Orange", value: "#FFA07A" },
  { name: "Brown", value: "#9E2146" },
  { name: "Teal", value: "#00A7E1" },
  { name: "Transparent", value: "transparent" },
];



export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}



// export const handleOnRelationalSelectScroll = function(module_id : string){

//   console.log(module_id)

// }


export const throttle = function (func: Function, limit: number) {
  let inThrottle: boolean;
  return function (this: unknown, ...originalArgs: any[]) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, originalArgs);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait: number
): DebouncedFn {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  }) as DebouncedFn;

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

export const deepEqual = function (x: { [x: string]: any; } | null, y: { [x: string]: any; hasOwnProperty?: any; } | null) {
  if (x === y) {
    return true;
  }
  else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
    if (Object.keys(x).length != Object.keys(y).length)
      return false;

    for (var prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop]))
          return false;
      }
      else
        return false;
    }

    return true;
  }
  else
    return false;
}


export const getInitials = function (name: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}


export const numberWithCommas = function (x: string) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "0";
};