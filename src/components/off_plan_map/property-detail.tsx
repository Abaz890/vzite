import {
  Check,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Phone,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { PropertyCarousel } from "./property-carousel";
import { MapComponent } from "./map-component";
import { Key, useEffect, useRef, useState } from "react";
import DOMPurify from 'dompurify';
import LazyImage from "../ui/lazyImage";
import { usePropertyState } from "@/providers/propertyContext";


// interface PropertyDetailsPopupProps {
//   isOpen: boolean
//   onOpenChange: (open: boolean) => void
// }

export function PropertyDetail({ property }: any) {
  const [activeTab, setActiveTab] = useState("info");
  const [activePaymentPlan, setActivePaymentPlan] = useState(property.payment_plan.length > 0 ? property.payment_plan[0] : null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    info: null,
    about: null,
    features: null,
    layouts: null,
    location: null,
    paymentPlan: null,
    files: null,
    developer: null,
  });


  const { modalRefs, presentation } = usePropertyState();

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section && contentRef.current) {
      const topOffset = section.offsetTop - 120;
      contentRef.current.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  // Update active tab based on scroll position
  useEffect(() => {
    if (!contentRef.current) return;

    const handleScroll = () => {
      const scrollPosition = contentRef.current?.scrollTop || 0;

      // Find the current section based on scroll position
      const currentSection = Object.entries(sectionRefs.current).reduce(
        (closest, [sectionId, sectionEl]) => {
          if (!sectionEl) return closest;

          const sectionTop = sectionEl.offsetTop - 120; // Adjust for header height

          // If this section is above the current scroll position and closer than the current closest
          if (sectionTop <= scrollPosition && (!closest.element || sectionTop > closest.element.offsetTop - 120)) {
            return { id: sectionId, element: sectionEl };
          }
          return closest;
        },
        { id: "", element: null as HTMLElement | null }
      );

      if (currentSection.id && currentSection.id !== activeTab) {
        setActiveTab(currentSection.id);
      }
    };

    const contentElement = contentRef.current;
    contentElement.addEventListener("scroll", handleScroll);

    // Initial check for active section
    handleScroll();

    return () => {
      contentElement.removeEventListener("scroll", handleScroll);
    };
  }, [activeTab]);


  function SafeDescription({ htmlString }: { htmlString: string }) {
    const clean = DOMPurify.sanitize(htmlString);
    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-background p-3 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-2xl font-bold">{property.title}</DialogTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">
                Off-plan
              </Badge>
              <Badge variant="secondary" className="bg-amber-500 text-white hover:bg-amber-600">
                Popular
              </Badge>
            </div>
          </div>
          <div>
            <Button variant={'outline'} onClick={() => modalRefs.presentationModalRef?.current.toggleModal()} >
              <ShoppingCart />
              <span>
                <Badge variant={'default'} className="mx-1 rounded-full">
                  {presentation.projectCount()}
                </Badge>
                <span>Property</span>
              </span>
              ,
              <span>
                <Badge variant={'default'} className="me-1 rounded-full">{presentation.unitCount()}</Badge>
                <span>Units</span>
              </span>
            </Button>
          </div>
        </div>

        <div className="mt-2 overflow-x-auto">
          <div className="flex space-x-1 min-w-max">
            {Object.keys(sectionRefs.current).map((tab) => (
              <button key={tab} onClick={() => scrollToSection(tab)} className={cn("px-4 py-2 text-sm font-medium transition-colors", activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground")}>
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1")}
              </button>
            ))}
          </div>
          <Separator className="mt-0" />
        </div>
      </div>

      <div ref={contentRef} className="flex-1 overflow-y-auto p-6 pt-0">
        <section id="info" ref={(el) => (sectionRefs.current.info = el)} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Project Info</h2>
          <PropertyCarousel imageSrcKey="url" slides={property.media}></PropertyCarousel>
        </section>

        <section id="about" ref={(el) => (sectionRefs.current.about = el)} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <div className="space-y-6">
            <SafeDescription htmlString={property.description}></SafeDescription>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                {
                  property.price.from && property.price.to ?
                  (
                    <p className="font-medium">
                      From {parseInt(property.price.from).toLocaleString()} AED - {parseFloat(property.price.to).toLocaleString()} AED
                    </p>
                  )
                  : '-'
                }
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Developer</h3>
                <p className="font-medium">{property.developer.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Delivery date</h3>
                <p className="font-medium">{property.handover_at}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Reference ID</h3>
                <p className="font-medium">{property.reference_id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                <p className="font-medium">
                  {property.district.name}, {property.emirate.name}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" ref={(el) => (sectionRefs.current.features = el)} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {property.amenities.map((amenity: { icon: string; name: string }, key: Key) => (
              <Card key={key}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3">
                    <LazyImage src={amenity.icon} width={26} className={`h-5 w-5 text-muted-foreground`} alt={amenity.name}></LazyImage>
                  </div>
                  <span>{amenity.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="layouts" ref={(el) => (sectionRefs.current.layouts = el)} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Layouts</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-medium text-muted-foreground">Photo</th>
                  <th className="p-3 text-left font-medium text-muted-foreground">Type</th>
                  <th className="p-3 text-left font-medium text-muted-foreground">Apartment area</th>
                  <th className="p-3 text-left font-medium text-muted-foreground">Sale Price</th>
                  <th className="p-3 text-left font-medium text-muted-foreground">Size</th>
                  <th className="p-3 text-left font-medium text-muted-foreground">Delivery</th>
                  <th className="p-3 text-left font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {property.units.length ? property.units.map((unit: { id: number, layout: string; type: string; price: string; square: string; floor_plan: string; property_reference_id: string }, index: Key) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">
                      <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center">{unit.floor_plan ? <LazyImage src={unit.floor_plan} className={`h-16 text-muted-foreground`} alt={unit.layout}></LazyImage> : <FileText className="h-6 w-6 text-muted-foreground" />}</div>
                    </td>
                    <td className="p-3 font-medium">{unit.layout}</td>
                    <td className="p-3">{unit.type}</td>
                    <td className="p-3">
                      <div className="font-medium">{unit.price ?  `${parseFloat(unit.price).toLocaleString()} AED` : '-'}</div>
                      {/* <div className="text-sm text-muted-foreground">{unit.pricePerSqm}</div> */}
                    </td>
                    <td className="p-3"> { unit.square ? `${unit.square} Sqft` : '-' } </td>
                    <td className="p-3">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{property.handover_at}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button onClick={() => !presentation.isUnitSelected(unit.id, unit.property_reference_id) ? presentation.pushUnit(unit, { reference_id: unit.property_reference_id, name: 'xx' }) : presentation.pullUnit(unit.property_reference_id, unit.id)} variant="outline" size="icon" className={`h-8 w-8 ${presentation.isUnitSelected(unit.id, unit.property_reference_id) && 'bg-blue-500 hover:bg-blue-500'} `}>
                          {
                            presentation.isUnitSelected(unit.id, unit.property_reference_id) ? <Check className="text-white h-4 w-4" /> : <Plus className="h-4 w-4" />
                          }
                        </Button>
                        {/* <Button variant="outline" size="icon" className="h-8 w-8">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button> */}
                      </div>
                    </td>
                  </tr>
                )) :
                  <tr className="text-center bg-gray-50">
                    <td colSpan={7}>
                      <div className="m-2">No Units Available</div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>

        <section id="location" ref={(el) => (sectionRefs.current.location = el)} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <MapComponent districts={[]} emirates={[]} points={[property.coordinates]} onMapLoaded={() => { }} onMapMoveEnd={() => { }} onMarkerClick={() => { }}></MapComponent>
            {/* <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.PNG-ww8ItwIKUM7SAIAhfEgVPTSS5lLD4Z.png"
                alt="Property location map"
                className="w-full h-full object-cover"
              /> */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
              <h3 className="font-medium">{property.title}</h3>
              <p className="text-sm text-muted-foreground">From  {property.price.from  &&  parseFloat(property.price.from).toLocaleString()}</p>
            </div>
          </div>
        </section>

        <section id="paymentPlan" ref={(el) => (sectionRefs.current.paymentPlan = el)} className="mb-10" >
          <h2 className="text-xl font-semibold mb-4">Payment Plan</h2>
          <div className="flex flex-col">
            <div className="">
              {property.payment_plan.map((payment_plan: { id: number, title: string }) => (
                <button key={payment_plan.id} className={cn("px-4 py-2 text-sm font-medium transition-colors", activePaymentPlan.id == payment_plan.id ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground")} onClick={() => setActivePaymentPlan(payment_plan)}>
                  {payment_plan.title}
                </button>
              ))}
            </div>
            <div className="my-4 flex items-center">
              {

                activePaymentPlan ?
                  activePaymentPlan.phases.map((phase: { id: string, label: string, value: string }, key: number) => {

                    return <div className="flex items-center min-h-full h-full">
                      <div className="flex flex-col items-center bg-gray-100 p-2 rounded-lg min-h-full h-full">
                        <span className="text-[20px] font-semibold my-2">
                          {phase.value}
                        </span>
                        <span className="font-semibold text-[12px] capitalize">
                          {
                            phase.label
                              .split('_')
                              .join(' ')
                          }
                        </span>
                      </div>
                      {
                        key < activePaymentPlan.phases.length - 1 ?
                          <ChevronRight />
                          : null
                      }
                    </div>
                  }) : <div className="">No Payment Plans Available</div>
              }
            </div>
          </div>





        </section>

        <section id="files" ref={(el) => (sectionRefs.current.files = el)} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Files</h2>
          <div className="space-y-4">
            {property.attachments.map((attachment: { upload: { name: string; url: string } }, key: Key) => (
              <Card key={key}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-red-500" />
                    <span>{attachment.upload.name} .pdf</span>
                  </div>
                  <div className="flex gap-2">
                    <a href={attachment.upload.url} target="blank">
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </a>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="developer" ref={(el) => (sectionRefs.current.developer = el)} className="mb-40">
          <h2 className="text-xl font-semibold mb-4">Developer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {/* {
                <Avatar>
                  <AvatarImage src={property.developer.logo} alt={property.developer.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              } */}
              {property.developer.description}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Contacts</h3>
              <div className="space-y-6">
                {property.developer.contact_phone ? (
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone number</p>
                      <p className="font-medium">{property.developer.contact_phone}</p>
                    </div>
                  </div>
                ) : null}

                {property.developer.contact_phone ? (
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 text-blue-600 p-3 rounded-full">
                      <svg className="fill-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Whatsapp</p>
                      <p className="font-medium text-blue-500">
                        <a target="_blank" href={`https://wa.me/${property.developer.contact_phone}`}>Send Whatsapp</a>
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* <div className="flex items-center gap-4">
                  <div className="bg-slate-100 p-3 rounded-full">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="font-medium">info@saqan.ae</p>
                  </div>
                </div> */}
                {/* {property.developer.contact_email ? (
                ) : null} */}
                {/* {property.developer.site ? (
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 p-3 rounded-full">
                      <Globe className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <p className="font-medium">www.saqan.ae</p>
                    </div>
                  </div>
                ) : null} */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// const Globe = ({ className }: { className?: string }) => {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//       <circle cx="12" cy="12" r="10" />
//       <line x1="2" x2="22" y1="12" y2="12" />
//       <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
//     </svg>
//   );
// };

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Building, Calendar, Check, ChevronLeft, ChevronRight, DollarSign, Flag, Square } from "lucide-react"
// import { PropertyCarousel } from "./property-carousel"

// export function PropertyDetail({ property  } : any) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   const features = [
//     "RED BRICK",
//     "PRIVATE COURTYARDS",
//     "GRILL AND ENTERTAIN",
//     "HIGH CEILINGS",
//     "STAINLESS STEEL APPLIANCES",
//     "BUILT-IN MURPHY BED",
//     "HARDWOOD FLOORS",
//   ]

//   return (
//     <div className="bg-background">
//       <div className="flex items-center justify-between p-4 border-b">
//         <Button variant="ghost" className="gap-2">
//           <ChevronLeft className="h-4 w-4" />
//           Back to search
//         </Button>
//       </div>
//       <div className="flex flex-col max-h-[90vh] max-w-4xl overflow-y-auto">
//         <PropertyCarousel imageSrcKey="upload.url" slides={property.media} ></PropertyCarousel>
//         <Tabs defaultValue="overview" className="w-full">
//           <div className="px-4 border-b">
//             <TabsList className="w-full justify-start">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="facts">Facts & features</TabsTrigger>
//               <TabsTrigger value="market">Market value</TabsTrigger>
//               <TabsTrigger value="payment">Payment calculator</TabsTrigger>
//               <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
//             </TabsList>
//           </div>

//           <TabsContent value="overview" className="p-6">
//             <div className="space-y-6">
//               <div>

//               <h1 className="text-3xl font-bold">{property.title}</h1>
//               <h1 className="text-3xl font-bold">{property.price.from} - {property.price.to}</h1>
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 {features.map((feature, index) => (
//                   <Badge key={index} variant="secondary" className="px-3 py-1">
//                     {feature}
//                   </Badge>
//                 ))}
//               </div>

//               <div className="space-y-4">
//                 <p>
//                   {
//                     property.description
//                   }
//                 </p>
//                 <Button variant="link" className="p-0 h-auto">
//                   Show more
//                 </Button>
//               </div>
//               <Separator />

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4">
//                     <div className="p-2 bg-muted rounded-full">
//                       <Building className="h-6 w-6" />
//                     </div>
//                     <div>
//                       <p className="font-medium">Condominium</p>
//                       <p className="text-sm text-muted-foreground">Property type</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <div className="p-2 bg-muted rounded-full">
//                       <Calendar className="h-6 w-6" />
//                     </div>
//                     <div>
//                       <p className="font-medium">Built in {property.yearBuilt || "1877"}</p>
//                       <p className="text-sm text-muted-foreground">Year built</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4">
//                     <div className="p-2 bg-muted rounded-full">
//                       <Square className="h-6 w-6" />
//                     </div>
//                     <div>
//                       <p className="font-medium">{property.sqft} sqft</p>
//                       <p className="text-sm text-muted-foreground">Living area</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <div className="p-2 bg-muted rounded-full">
//                       <DollarSign className="h-6 w-6" />
//                     </div>
//                     <div>
//                       <p className="font-medium">${property.hoa || "410"}/mo HOA</p>
//                       <p className="text-sm text-muted-foreground">HOA fees</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-muted p-4 rounded-lg">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="font-medium">Est. payment: ${property.estPayment || "2,507"}/mo</p>
//                     <p className="text-sm text-muted-foreground">Get pre-qualified</p>
//                   </div>
//                   <Button>Request a tour</Button>
//                 </div>
//               </div>

//               <Separator />

//               <div>
//                 <h2 className="text-xl font-semibold mb-4">What's special</h2>
//                 <div className="space-y-2">
//                   <p>
//                     {property.description ||
//                       "This beautiful property features hardwood floors throughout, stainless steel appliances, and high ceilings. The building offers private courtyards and areas to grill and entertain. Perfect for first-time buyers or investors."}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="facts">
//             <div className="p-6">
//               <h2 className="text-xl font-semibold mb-4">Facts and features</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div>
//                     <h3 className="font-medium">Interior features</h3>
//                     <ul className="mt-2 space-y-2">
//                       <li className="flex items-center gap-2">
//                         <Check className="h-4 w-4 text-primary" />
//                         Hardwood floors
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <Check className="h-4 w-4 text-primary" />
//                         High ceilings
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <Check className="h-4 w-4 text-primary" />
//                         Stainless steel appliances
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <Check className="h-4 w-4 text-primary" />
//                         Built-in Murphy bed
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <h3 className="font-medium">Exterior features</h3>
//                     <ul className="mt-2 space-y-2">
//                       <li className="flex items-center gap-2">
//                         <Check className="h-4 w-4 text-primary" />
//                         Red brick
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <Check className="h-4 w-4 text-primary" />
//                         Private courtyards
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <Check className="h-4 w-4 text-primary" />
//                         Grill and entertain area
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="market">
//             <div className="p-6">
//               <h2 className="text-xl font-semibold mb-4">Market value</h2>
//               <p>Market value information will be displayed here.</p>
//             </div>
//           </TabsContent>

//           <TabsContent value="payment">
//             <div className="p-6">
//               <h2 className="text-xl font-semibold mb-4">Payment calculator</h2>
//               <p>Payment calculator will be displayed here.</p>
//             </div>
//           </TabsContent>

//           <TabsContent value="neighborhood">
//             <div className="p-6">
//               <h2 className="text-xl font-semibold mb-4">Neighborhood</h2>
//               <p>Neighborhood information will be displayed here.</p>
//             </div>
//           </TabsContent>
//         </Tabs>

//       </div>

//     </div>
//   )
// }
