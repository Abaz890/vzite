

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";
import adminModuleRepository from "@/repositories/admin/adminModuleRepository";
import { GripVertical } from "lucide-react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "@/components/modules/kanban/StrictModeDroppable";
import { ToastAction } from "@/components/ui/toast";

export default function AdministratorModuleEdit() {
  let params = useParams(); 
  const { toast } = useToast();
  const { module_id } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [, setIsError] = useState(false);
  const [grouped_modules_fields, setGroupedModulesFields] = useState<any>([]);

  const fetchModuleData = async function () {
    const fieldsResponse = await adminModuleRepository.getModuleFieldsGrouped(
      module_id!
    );
    if (fieldsResponse.success) {
      const fields = fieldsResponse.data;
      setGroupedModulesFields(fields);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchModuleData();
  }, []);

  useEffect(() => {
    fetchModuleData();
  }, [module_id]);

  const onDragEnd = async (result: any) => {

    const { source, destination, type } = result;

    if (!destination) return;

    let updatedGroups = [...grouped_modules_fields];

    if (type === "group") {
      const [movedGroup] = updatedGroups.splice(source.index, 1);
      updatedGroups.splice(destination.index, 0, movedGroup);
    } else if (type === "field") {
      const sourceGroup = updatedGroups[source.droppableId];
      const destinationGroup = updatedGroups[destination.droppableId];

      const sourceFields = [...sourceGroup.fields];
      const [movedField] = sourceFields.splice(source.index, 1);

      if (sourceGroup === destinationGroup) {
        sourceFields.splice(destination.index, 0, movedField);
        updatedGroups[source.droppableId] = {
          ...sourceGroup,
          fields: sourceFields,
        };
      } else {
        const destinationFields = [...destinationGroup.fields];
        destinationFields.splice(destination.index, 0, movedField);

        updatedGroups[source.droppableId] = {
          ...sourceGroup,
          fields: sourceFields,
        };
        updatedGroups[destination.droppableId] = {
          ...destinationGroup,
          fields: destinationFields,
        };
      }
    }

    setGroupedModulesFields(updatedGroups);

    const payload = updatedGroups.map((group, groupIndex) => ({
      id: group.id,
      sorting: groupIndex,
      fields: group.fields.map((field: { id: any; }, fieldIndex: any) => ({
        id: field.id,
        sorting: fieldIndex,
      })),
    }));

    const response = await adminModuleRepository.sortModuleGroupFields({ module_id, payload })
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "module fields sorting successfully updated",
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }

  };

  return (
    <AuthenticatedLayoutAdmin
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Modules list
        </h2>
      }
    >
      <div className="flex flex-col">
        {isLoading ? (
          <h4>loading</h4>
        ) : grouped_modules_fields ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="all-groups" type="group">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid gap-4 py-4"
                >
                  {grouped_modules_fields.map(
                    (group: any, groupIndex: number) => (
                      <Draggable
                        draggableId={`group-${groupIndex}`}
                        index={groupIndex}
                        key={groupIndex}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <CardHeader>
                              <CardTitle>
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-grab"
                                >
                                  <GripVertical />
                                </div>
                                <div className="my-2">{group.title}</div>
                                <div>{group.description}</div>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <StrictModeDroppable
                                droppableId={`${groupIndex}`}
                                type="field"
                              >
                                {(provided) => (
                                  <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="grid gap-6 grid-cols-12"
                                  >
                                    {group.fields.map(
                                      (field: any, fieldIndex: number) => (
                                        <Draggable
                                          draggableId={`field-${groupIndex}-${fieldIndex}`}
                                          index={fieldIndex}
                                          key={`field-${groupIndex}-${fieldIndex}`}
                                        >
                                          {(provided) => (
                                            <Card
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className={[
                                                "textarea",
                                                "map",
                                              ].includes(field.type)
                                                ? "col-span-12"
                                                : "col-span-6"}
                                            >
                                              <CardTitle className="p-3">
                                                <GripVertical className="cursor-grab" />
                                              </CardTitle>
                                              <CardContent>
                                                {field.title}
                                              </CardContent>
                                            </Card>
                                          )}
                                        </Draggable>
                                      )
                                    )}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </StrictModeDroppable>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        ) : (
          <></>
        )}
      </div>
    </AuthenticatedLayoutAdmin>
  );
}