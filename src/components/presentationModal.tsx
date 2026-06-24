import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight, FileText, GripVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PresentationUnit, Project, usePropertyState } from "@/providers/propertyContext";
import { useGlobalState } from "@/providers/globalContext";
import companyPresentationRepository from "@/repositories/company/companyPresentationRepository";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Spinner } from "./ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export interface PresentationModalRef {
  isOpen: boolean;
  toggleModal: () => void;
  closeModal: () => void;
}

export const PresentationModal = forwardRef<PresentationModalRef>((_props, ref) => {
  const { presentation } = usePropertyState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [toggledProject, setToggledProject] = useState<string[]>([]);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);

  // const [hex, setHex] = useState("#fff");
  const [bg_hex, setBgHex] = useState("#1434A4");
  const [text_hex, setTextHex] = useState("#fff");
  const [saveTheme, setSaveTheme] = useState(true);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const { modalRefs, globalStateLoading, echo, agent } = useGlobalState();
  const { toast } = useToast();

  const generateUnitSortPayload = (reorderedProjectsMap: Record<string, any>) => {
    const result: { unit_id: number; sort_order: number }[] = [];
    let index = 0;

    for (const project of Object.values(reorderedProjectsMap)) {
      for (const unitWrapper of project.units) {
        result.push({
          unit_id: parseInt(unitWrapper.unit_id), // or unitWrapper.unit.id
          sort_order: index++,
        });
      }
    }

    return result;
  };

  const getSetTheme = async () => {
    try {
      const data = await companyPresentationRepository.getTheme();

      // Accessing the keys as they appear in your API response
      if (data) {
        console.log('hex colors');
        console.log(data.data.bg_hex);
        setBgHex(data.data.bg_hex);
        setTextHex(data.data.text_hex);
      }
    } catch (error) {
      console.error("BackOffice Fetch Error:", error);
    }
  };

  const handleDragStart = (e: any) => setActiveId(e.active.id.toString());

  const handleDragEnd = async (e: { active: any; over: any }) => {
    const { active, over } = e;
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    const currentProjectsMap = presentation.value.projects;
    const projectsArray = Object.values(currentProjectsMap);

    const oldProjectIndex = projectsArray.findIndex((p) => p.reference_id === active.id);
    const newProjectIndex = projectsArray.findIndex((p) => p.reference_id === over.id);

    if (oldProjectIndex !== -1 && newProjectIndex !== -1) {
      const newOrderedProjectsArray: Project[] = arrayMove(projectsArray, oldProjectIndex, newProjectIndex);

      const reorderedProjectsMap: Record<string, Project> = {};
      newOrderedProjectsArray.forEach((project) => {
        reorderedProjectsMap[project.reference_id] = project;
      });

      presentation.set({
        ...presentation.value,
        projects: reorderedProjectsMap,
      });

      const newSortingPayload = generateUnitSortPayload(reorderedProjectsMap);
      const sortResponse = await companyPresentationRepository.sortPresentationUnit(presentation.value.permalink, newSortingPayload);
      if (sortResponse.success) {
        toast({
          variant: "default",
          duration: 800,
          className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          title: `sorting successfully updated`,
          action: <ToastAction altText="close">close</ToastAction>,
        });
      }
      setActiveId(null);
      return;
    }

    let activeUnitParentProject: Project | undefined;
    let overUnitParentProject: Project | undefined;
    for (const project of projectsArray) {
      if (project.units.some((unit) => unit.id.toString() === active.id)) {
        activeUnitParentProject = project;
      }
      if (project.units.some((unit) => unit.id.toString() === over.id)) {
        overUnitParentProject = project;
      }
      if (activeUnitParentProject && overUnitParentProject) break;
    }

    if (activeUnitParentProject && overUnitParentProject && activeUnitParentProject.reference_id === overUnitParentProject.reference_id) {
      const projectToUpdate = activeUnitParentProject;
      const oldUnitIndex = projectToUpdate.units.findIndex((u) => u.id.toString() === active.id);
      const newUnitIndex = projectToUpdate.units.findIndex((u) => u.id.toString() === over.id);

      if (oldUnitIndex !== -1 && newUnitIndex !== -1) {
        const newOrderedUnits: PresentationUnit[] = arrayMove(projectToUpdate.units, oldUnitIndex, newUnitIndex);

        const updatedProject: Project = {
          ...projectToUpdate,
          units: newOrderedUnits,
        };

        const updatedProjectsMap: Record<string, Project> = {
          ...currentProjectsMap,
          [updatedProject.reference_id]: updatedProject,
        };

        presentation.set({
          ...presentation.value,
          projects: updatedProjectsMap,
        });
      }
    }

    setActiveId(null);
  };

  const handleDeleteUnit = async (propertyId: string, id: any) => {
    console.log(propertyId, id, "at handle Delete");

    presentation.pullUnit(propertyId, id);
  };

  const deleteProperty = (propertyId: string, unitId: string) => {
    modalRefs.deleteModalRef?.current.toggleModal(propertyId, () => handleDeleteUnit(propertyId, unitId));
  };

  const toggleProject = (projectId: string) => {
    setToggledProject((prev) => (prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]));
  };

  useImperativeHandle(ref, () => ({
    isOpen: isModalOpen,
    toggleModal: () => setIsModalOpen((prev) => !prev),
    closeModal: () => setIsModalOpen(false),
  }));

  const ProjectItem = ({ project, toggle, remove }: { project: Project; toggle: (id: string) => void; remove: (id: string) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.reference_id });

    const style = { transform: CSS.Transform.toString(transform), transition };
    const isProjectToggled = (projectId: string) => {
      return toggledProject.includes(projectId);
    };

    return (
      <div ref={setNodeRef} style={style} className={cn(isDragging && "z-50")}>
        <div className="grid grid-cols-[40px_1.2fr_1fr_1fr_1fr_1fr_40px_60px] items-center bg-blue-50 border-b-2 border-blue-200 px-4 py-3">
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="h-4 w-4 text-blue-600" />
          </div>
          <div className="col-span-5 flex items-center">
            <button onClick={() => toggle(project.reference_id)} className="flex items-center gap-2">
              {isProjectToggled(project.reference_id) ? <ChevronDown /> : <ChevronRight />}
              {project.name} <span className="text-sm">({project.units.length} units)</span>
            </button>
          </div>
          <div></div>
          <div></div>
        </div>

        {toggledProject.includes(project.reference_id) && (
          <SortableContext items={project.units.map((p: PresentationUnit) => p.id.toString())} strategy={verticalListSortingStrategy}>
            {Object.values(project.units).map((property: PresentationUnit) => (
              <PropertyItem
                key={property.id}
                property={property}
                onDelete={(unit_id) => {
                  console.log(unit_id, "unit_id inside prop");
                  return remove(unit_id);
                }}
              />
            ))}
          </SortableContext>
        )}
      </div>
    );
  };

  const PropertyItem = ({ property, onDelete }: { property: PresentationUnit; onDelete: (id: string) => void }) => {
    const { setNodeRef, transform, transition } = useSortable({ id: property.id.toString() });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
      <div ref={setNodeRef} style={style} className="grid grid-cols-[40px_1.2fr_1fr_1fr_1fr_1fr_40px_60px] items-center border-b px-4 py-3 hover:bg-gray-50">
        {/* <div {...attributes} {...listeners} className="cursor-grab"><GripVertical className="h-4 w-4 text-gray-400" /></div> */}
        <div className=""></div>
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center">{property.unit.floor_plan ? <img src={property.unit.floor_plan} className={`h-16 text-muted-foreground`} alt={property.unit.layout} /> : <FileText className="h-6 w-6 text-muted-foreground" />}</div>
          <span>{property.unit.bedrooms}</span>
        </div>
        <div>{property.unit.layout}</div>
        <div>
          {property.unit.square}
          <sup>2</sup>
        </div>
        <div>{property.unit.price}</div>
        <div>{property.unit.project_name}</div>
        <div>{property.unit.status}</div>
        <div>
          <Button onClick={() => onDelete(property.unit.id.toString())} variant="ghost" size="sm">
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>
    );
  };

  const activeItem = activeId
    ? Object.values(presentation.value.projects).find((p) => p.reference_id === activeId) ||
      Object.values(presentation.value.projects)
        .flatMap((p) => p.units)
        .find((u) => u.id.toString() === activeId)
    : null;

  async function handleClickDownloadPdf() {
    setIsDownloadLoading(true);
    const response = await companyPresentationRepository.generatePresentationPdf(presentation.value.permalink, bg_hex, text_hex, saveTheme);
    if (response.success) {
    }
  }

  // useEffect(() => {
  //   if (!globalStateLoading) {
  //     echo.private(`user.${agent.value.id}`).listen(".PresentationGenerated", async () => {
  //       setIsDownloadLoading(false);
  //     });

  //     return () => {
  //       echo.private(`user.${agent.value.id}`).stopListening(".PresentationGenerated");
  //     };
  //   }
  // }, [globalStateLoading]);

  // TRIGGER 1: Run automatically when the Modal mounts (loads)
  // useEffect(() => {
    
  // }, []);

  useEffect(() => {
    getSetTheme();
    if (!globalStateLoading && agent?.value?.id) {
      const channel = echo.private(`user.${agent.value.id}`);

      channel.listen(".PresentationGenerated", async (data: { token: string }) => {
        // 1. Stop the loading spinner
        setIsDownloadLoading(false);

        // 2. Trigger the actual download function!
        // 'data.token' comes from your Laravel event: ['token' => $this->token]
        if (data.token) {
          await companyPresentationRepository.downloadPresentationPdf(data.token);
        }
      });

      return () => {
        channel.stopListening(".PresentationGenerated");
      };
    }
  }, [globalStateLoading, agent?.value?.id]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-6xl py-8 max-h-[600px] overflow-auto rounded-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between">
            <div className="">Presentation</div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-12">
          <div className="col-span-9">
            <div className="bg-gray-50 rounded-md overflow-auto h-full">
              <div className="grid grid-cols-[10px_1.2fr_1fr_1fr_1fr_1fr_40px_60px] bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600 border-b">
                <div></div>
                <div></div>
                <div>Bedrooms</div>
                <div>Apartment area</div>
                <div>Price</div>
                <div>Project</div>
                <div>Building</div>
                <div></div>
                <div></div>
              </div>

              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <SortableContext items={Object.values(presentation.value.projects).map((g) => g.reference_id)} strategy={verticalListSortingStrategy}>
                  {Object.values(presentation.value.projects).map((project: Project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      toggle={toggleProject}
                      remove={(unit_id) => {
                        deleteProperty(project.reference_id, unit_id);
                      }}
                    />
                  ))}
                </SortableContext>
                <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: "0.5" } } }) }} adjustScale={false}>
                  {activeId && activeItem ? (activeItem as Project).reference_id ? 
                  <ProjectItem project={activeItem as Project} toggle={toggleProject} remove={() => console.log("")} /> 
                  : 
                  <PropertyItem property={activeItem as PresentationUnit} onDelete={() => {}} /> : null}
                </DragOverlay>
              </DndContext>

            </div>
          </div>
          <div className="col-span-3 border-l bg-gray-50 flex flex-col">
            <div className="bg-gray-50 p-6 border-b flex gap-2">
              <Button onClick={handleClickDownloadPdf} className="w-full" disabled={isDownloadLoading}>
                {" "}
                {isDownloadLoading ? <Spinner /> : <></>} Download As PDF
              </Button>
            </div>

            <button onClick={() => getSetTheme()} className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-500  transition-all active:scale-95">
              Refresh Theme
            </button>

            <div className="bg-gray-50 p-6 border-b flex flex-col gap-4">
              <div className="w-18 rounded-md border border-gray-300 flex flex-col items-center" style={{ backgroundColor: bg_hex }}>
                <p className="p-2 font-medium text-justify" style={{ color: text_hex }}>
                  Sample Text: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                {/* <button className="m-4 w-16 h-8 rounded-md border bg-slate-100 border-gray-300 transition-transform hover:scale-110 active:scale-95">Save</button> */}
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="theme" className="text-sm cursor-pointer">
                  Save Theme Selection
                </Label>
                <Switch id="theme" checked={saveTheme} onClick={() => setSaveTheme(!saveTheme)} />
              </div>
              {/* Prebuilt Color Swatches */}
              <div className="bg-gray-50 p-4 rounded-2xl border-gray-200 border-2">
                <h2 className="text-slate mb-2 ">Backgroud Color</h2>
                <div style={{ marginLeft: 20 }} className="flex flex-wrap gap-2">
                  {[
                    { name: "Black", code: "#000000" },
                    { name: "White", code: "#FFFFFF" },
                    { name: "Gold", code: "#D4AF37" },
                    { name: "Navy Blue", code: "#000080" },
                    { name: "Slate Gray", code: "#708090" },
                    { name: "Royal Plum", code: "#4B0082" },
                    { name: "Oxford Blue", code: "#002147" },
                    { name: "Hunter Green", code: "#355E3B" },
                    { name: "Champagne", code: "#F7E7CE" },
                    { name: "Silver", code: "#C0C0C0" },
                    { name: "Midnight Moss", code: "#2E3B23" },
                    { name: "Burgundy", code: "#800020" },
                  ].map((preset) => (
                    <button
                      key={preset.code}
                      onClick={() => setBgHex(preset.code)}
                      title={preset.name}
                      className="w-8 h-8 rounded-md border border-gray-300 transition-transform hover:scale-110 active:scale-95"
                      style={{
                        backgroundColor: preset.code,
                        cursor: "pointer",
                        boxShadow: bg_hex === preset.code ? "0 0 0 2px #fff, 0 0 0 4px #3b82f6" : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border-gray-200 border-2">
                <div className="flex">
                  <h2>Text Color</h2>
                </div>
                <div style={{ marginLeft: 20 }} className="flex flex-wrap gap-2">
                  {[
                    { name: "Black", code: "#000000" },
                    { name: "White", code: "#FFFFFF" },
                    { name: "Gold", code: "#D4AF37" },
                    { name: "Navy Blue", code: "#000080" },
                    { name: "Slate Gray", code: "#708090" },
                    { name: "Royal Plum", code: "#4B0082" },
                    { name: "Oxford Blue", code: "#002147" },
                    { name: "Hunter Green", code: "#355E3B" },
                    { name: "Champagne", code: "#F7E7CE" },
                    { name: "Silver", code: "#C0C0C0" },
                    { name: "Midnight Moss", code: "#2E3B23" },
                    { name: "Burgundy", code: "#800020" },
                  ].map((preset) => (
                    <button
                      key={preset.code}
                      onClick={() => setTextHex(preset.code)}
                      title={preset.name}
                      className="w-8 h-8 rounded-md border border-gray-300 transition-transform hover:scale-110 active:scale-95"
                      style={{
                        backgroundColor: preset.code,
                        cursor: "pointer",
                        boxShadow: text_hex === preset.code ? "0 0 0 2px #fff, 0 0 0 4px #3b82f6" : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6 space-y-6">
              {/* Language Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Presentation language</Label>
                <Select disabled={true} defaultValue="english">
                  <SelectTrigger value={"english"} className="bg-white">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Currency Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Presentation currency</Label>
                <Select disabled={true} defaultValue="aed">
                  <SelectTrigger value={"aed"} className="bg-white">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aed">UAE Dirham (AED)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">Visibility setting</Label>

                <div className="space-y-3">
                  {[
                    { key: "fullDescription", label: "Display full description" },
                    { key: "developer", label: "Display developer" },
                    { key: "locationMap", label: "Display location on map" },
                    { key: "typicalUnits", label: "Display typical units" },
                    { key: "unitPrices", label: "Display unit prices" },
                    { key: "floorPlans", label: "Display floor plans" },
                    { key: "amenities", label: "Display amenities" },
                    { key: "paymentPlan", label: "Display payment plan" },
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <Label htmlFor={setting.key} className="text-sm cursor-pointer">
                        {setting.label}
                      </Label>
                      <Switch id={setting.key} disabled={true} checked={true} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

PresentationModal.displayName = "PresentationModal";
