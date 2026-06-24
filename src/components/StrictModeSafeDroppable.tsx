// src/components/StrictModeSafeDroppable.tsx
import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

export const StrictModeSafeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  // 1. Solve the React 18 Strict Mode issue
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  
  // 2. Solve the defaultProps warning
  const droppableComponent = Droppable as any;
  if (droppableComponent.defaultProps) {
    droppableComponent.defaultProps.isDropDisabled = false;
  }

  return <Droppable {...props}>{children}</Droppable>;
};