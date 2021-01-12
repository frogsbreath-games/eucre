import * as React from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";

interface IProps {
  dropAction?: (item?: any) => void; //function if dropped into a accepting zone
  dragType: string; //dnd-type of object being dragged
}

const DragWrapper: React.FC<IProps> = ({ dropAction, dragType, children }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: dragType },
    end: (item: { type: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dropAction && dropAction();
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const display = isDragging ? "none" : "";
  return (
    <div ref={drag} style={{ display }}>
      {children}
    </div>
  );
};

export default DragWrapper;
