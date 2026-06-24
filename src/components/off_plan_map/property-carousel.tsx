import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
// import { Skeleton } from "@/components/ui/skeleton";
import LazyImage from "../ui/lazyImage";
import { useState, useEffect } from "react";

interface Props {
  slides: any[];
  className?: string;
  contentClass? : string;
  imageSrcKey: string;
}

export function PropertyCarousel({ slides, className, contentClass, imageSrcKey }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? "https://www.svgrepo.com/show/508699/landscape-placeholder.svg";
  };

  return (
    <div className={`${className || ""}`}>
      <Carousel className="rounded-t-lg h-full" setApi={setApi}>
        <CarouselContent className={`rounded-t-lg ${contentClass}` }>
        {/* h-[180px] min-h[180px] */}
          {slides.length > 0 ? (
            slides.map((slide, index) => (
              <CarouselItem id={`slide-${index}`} key={slide.id} className="rounded-t-lg">
                <LazyImage width={`100%`} src={getNestedValue(slide, imageSrcKey)} alt={`Slide ${index + 1}`} className={` aspect-[16/9] rounded-t-lg`} />
              </CarouselItem>
            ))
          ) : (
            <img className="w-full" src="https://placehold.co/380x200" />
          )}
        </CarouselContent>

        {/* Control buttons positioned on the sides */}
        {slides.length > 0 ? (
          <>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white text-black hover:bg-gray-100" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white text-black hover:bg-gray-100" />
          </>
        ) : (
          <></>
        )}
        {/* Dots indicator positioned at the bottom */}
        {slides.length > 0 ? (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <div className="flex space-x-2 bg-black rounded-full px-3 py-1.5">
              {Array.from({ length: count }).map((_, index) => (
                <button key={index} className={`w-2.5 h-2.5 rounded-full transition-all ${current === index + 1 ? "bg-white" : "bg-white/30"}`} onClick={() => api?.scrollTo(index)} aria-label={`Go to slide ${index + 1}`} />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </Carousel>
    </div>
  );
}
