import type { Identifier, XYCoord } from 'dnd-core'
import { FC , useRef  } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { TMedia } from '../types/global'
import FieldInput from './FieldInput'
import { ItemTypes } from './ItemTypes'

const style = {
    cursor: 'move',
    opacity: '1',
    // minWidth: '300px',
    height: '300px',
    margin: '50px 30px',
}

export interface CardProps {
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  item: TMedia;
}

type DragItem = {
  index: number
  id: string
  type: string
}


export const Card: FC<CardProps> = ({  
  index, 
  moveCard,
  item,
}) => {

  const ref = useRef<HTMLDivElement>(null)
  
  // const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
  //   accept: ItemTypes.CARD,
  //   collect(monitor) {
  //     return {
  //       handlerId: monitor.getHandlerId(),
  //     };
  //   },
    
  //   hover(draggedItem: DragItem, monitor) {
  //     if (!ref.current) {
  //       return;
  //     }
  //     const dragIndex = draggedItem.index;
  //     const hoverIndex = index;

  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }

  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();
  //     const hoverMiddleY =
  //       (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //     const clientOffset = monitor.getClientOffset();
  //     const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

  //     if (
  //       (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
  //       (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
  //     ) {
  //       moveCard(dragIndex, hoverIndex);
  //       draggedItem.index = hoverIndex;
  //     }
  //   },
  // });
 const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })



  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { index }; 
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
        <FieldInput 
        item={item}    
        />
    </div>
  )
}
export default Card;
