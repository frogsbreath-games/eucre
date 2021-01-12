import React from "react";
import { useDrop } from "react-dnd";

interface IProps {
  name: string; // name of resulting drop zone emitted as function on dropping of accepted object
  accept: string; // dnd-type of objects accepting into this drop ref
}

const DropWrapper: React.FC<IProps> = ({ name, accept, children }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: accept,
    drop: () => ({ name: name }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return <div ref={drop}>{children}</div>;
};

export default DropWrapper;
