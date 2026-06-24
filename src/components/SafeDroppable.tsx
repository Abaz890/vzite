// src/components/SafeDroppable.tsx
import { Droppable, DroppableProps } from "react-beautiful-dnd";

export const SafeDroppable = ({ children, ...props }: DroppableProps) => {
  // Suppress the warning by removing defaultProps from the library's component
  // before we render it. This is a workaround for an unmaintained library.
  const droppableComponent = Droppable as any;
  if (droppableComponent.defaultProps) {
    droppableComponent.defaultProps.isDropDisabled = false;
  }

  return <Droppable {...props}>{children}</Droppable>;
};