import companyPresentationRepository from "@/repositories/company/companyPresentationRepository";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useGlobalState } from "./globalContext";


type PriceRange = {
  min: number | undefined;
  max: number | undefined;
};

type SizeRange = {
  min: number | undefined;
  max: number | undefined;
};

type BedsAndBaths = {
  beds: number | null;
  baths: number | null;
};

type MoreFilters = {
  features: string[];
  yearBuilt: {
    min: string;
    max: string;
  };
  sqft: {
    min: string;
    max: string;
  };
  lotSize: {
    min: string;
    max: string;
  };
  daysOnMarket: number;
};

type Unit = {
  id: number;
  property_reference_id: string;
  type: string;
  price: string;
  floor: string;
  floor_plan: string;
  bedrooms: string;
  layout: string;
  square: string;
  project_name: string;
  status: any
};

export type PresentationUnit = {
  id: number;
  property_reference_id: string;
  unit_id: number;
  selling_price: string | null;
  selling_size: string | null;
  presentation_id: number;
  created_at: string;
  updated_at: string;
  unit: Unit;
};

export type Project = {
  id: number;
  reference_id: string;
  name: string;
  units: PresentationUnit[];
};

type PresentationType = {
  name: string;
  permalink: string;
  projects: Record<string, Project>;
};


type PresentationMethodsType = {
  value: PresentationType,
  set: (value: PresentationType) => void;
  clear: () => void;
  pushUnit: (unit: any, project: { reference_id: string; name: string }) => void;
  pullUnit: (project_id: string, unit_id: number) => void;
  isUnitSelected: (unit_id: number, property_reference_id: string) => boolean;
  projectCount: () => number;
  unitCount: () => number;
};


export type PropertyFilterType = {
  source: string;
  saleStatus: string;
  name: string;
  price: PriceRange;
  size: SizeRange;
  bedsAndBaths: BedsAndBaths;
  homeTypes: string[];
  more: MoreFilters;
  emirate_id: string;
  district_id: string;
  developer_id: string;
  centerMap: number[];
  boundsMap: {
    northEast: number[],
    southWest: number[]
  },
  zoomMap: number,
  orderBy: string
};

type PropertyContextType = {
  filters: PropertyFilterType;
  setFilters: React.Dispatch<React.SetStateAction<PropertyFilterType>>;
  resetFilters: () => void;
  modalRefs: {
    presentationModalRef: React.RefObject<any> | null;
  };
  setModalRefs: (refs: Partial<PropertyContextType["modalRefs"]>) => void;
  presentation: PresentationMethodsType
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const usePropertyState = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};

export const PropertyProvider = ({ children }: { children: React.ReactNode }) => {

  const { globalStateLoading } = useGlobalState();

  const initialFilters = {
    source: "",
    saleStatus: "for-sale",
    name: "",
    price: { min: undefined, max: undefined },
    size:{ min: undefined, max: undefined },
    bedsAndBaths: { beds: null, baths: null },
    homeTypes: [],
    emirate_id: "",
    district_id: "",
    developer_id: "",
    centerMap: [55.1885387, 25.074282299999993],
    boundsMap: {
      northEast: [
        56.001047994984134,
        25.87722891302606
      ],
      southWest: [
        54.37602940501588,
        24.529008076812147
      ]
    },
    zoomMap: 9,
    more: {
      features: [],
      yearBuilt: { min: "", max: "" },
      sqft: { min: "", max: "" },
      lotSize: { min: "", max: "" },
      daysOnMarket: 0,
    },
    orderBy: 'created_at'
  };

  const [presentation, setPresentation] = useState<PresentationType>({
    name: '',
    permalink: '',
    projects: {}
  });
  const unitIndexRef = useRef<Map<string, Set<string>>>(new Map());


  const [filters, setFilters] = useState<PropertyFilterType>(initialFilters);
  const [modalRefs, setModalRefsState] = useState<PropertyContextType['modalRefs']>({
    presentationModalRef: null
  });


  const setModalRefs = (newRefs: Partial<PropertyContextType['modalRefs']>) => {
    setModalRefsState((prev) => ({ ...prev, ...newRefs }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const presentationMethods: PresentationMethodsType = {
    value: presentation,
    set: setPresentation,
    clear: () => setPresentation({ name: '', permalink: '', projects: {} }),

    pushUnit: async (unit: Unit) => {
      try {
        let { permalink } = presentation;
        if (!permalink) {
          const { success, data } =
            await companyPresentationRepository.savePresentation();

          if (!success) return;
          permalink = data.permalink;
          Cookies.set('presentation', permalink);
          setPresentation((prev) => ({ ...prev, permalink }));
        }


        const optimisticPresentationUnit: PresentationUnit = {
          id: -1,
          unit_id: unit.id,
          property_reference_id: unit.property_reference_id,
          selling_price: unit.price,
          selling_size: unit.square,
          presentation_id: -1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          unit: unit,
        };


        const optimisticState = {
          ...presentation,
          projects: { ...presentation.projects },
        };

        const projectRef = unit.property_reference_id;
        if (!optimisticState.projects[projectRef]) {
          optimisticState.projects[projectRef] = {
            id: -1,
            reference_id: projectRef,
            name: unit.project_name,
            units: [],
          };
        }

        optimisticState.projects[projectRef].units.push(optimisticPresentationUnit);

        setPresentation(optimisticState);

        const { success, data } = await companyPresentationRepository.addPresentationUnit(
          permalink,
          unit.id
        );

        if (success) {
          setPresentation(data);
        }
        else {
          setPresentation(presentation);
        }

      } catch (err) {
        console.error('pushUnit failed:', err);
      }
    },
    pullUnit: async (proj_id: string, unitId: number) => {
      console.log(proj_id,unitId)
      const nextProjects = { ...presentation.projects };
      const updatedUnits = nextProjects[proj_id].units.filter(u => u.unit.id !== unitId);
      nextProjects[proj_id] = {
        ...nextProjects[proj_id],
        units: updatedUnits,
      };

      setPresentation((prev) => ({
        ...prev,
        projects: nextProjects,
      })); 
      const { success, data } = await companyPresentationRepository.removePresentationUnit(
        presentation.permalink,
        unitId
      );
      if (success) {
        setPresentation(data);
      }
      else {
        setPresentation(presentation);
      };


    },
    isUnitSelected: (unitId, projectRef) => {
      return (
        unitIndexRef.current
          .get(projectRef)
          ?.has(unitId.toString()) ?? false
      );
    },
    projectCount: () => Object.keys(presentation.projects).length,
    unitCount: () => {
      return Object.values(presentation.projects).reduce((count, project) => {
        return count + project.units.length;
      }, 0);
    }
  };

  const contextValue: PropertyContextType = {
    filters,
    modalRefs,
    presentation: presentationMethods,
    setFilters,
    resetFilters,
    setModalRefs
  }

  useEffect(() => {
    setFilters(initialFilters);
  }, [location.pathname]);


  const fetchInitPresentation = async function () {
    const id = Cookies.get('presentation');
    if (id) {
      const response = await companyPresentationRepository.getPresentation(id);

      if (response.success) {
        const fetchedPres = response.data;

        setPresentation({
          name: fetchedPres.name,
          permalink: fetchedPres.permalink,
          projects: fetchedPres.projects || {}
        });
      } else {
        // Cookies.remove('presentation');
      }
    }
  }

  useEffect(() => {
    const newIndex = new Map<string, Set<string>>();

    Object.values(presentation.projects).forEach(project => {
      newIndex.set(
        project.reference_id,
        new Set(project.units.map(u => u.unit_id.toString()))
      );
    });

    unitIndexRef.current = newIndex;
  }, [presentation.projects]);

  useEffect(() => {
    if (!globalStateLoading) {
      fetchInitPresentation();
    }
  }, [globalStateLoading])

  return <PropertyContext.Provider value={contextValue}>{children}</PropertyContext.Provider>;
};
