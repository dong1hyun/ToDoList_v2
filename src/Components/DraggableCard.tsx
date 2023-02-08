import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.isDragging ? '#74b9ff' : props.theme.cardColor};
  box-shadow: ${(props) => props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`
interface IDraggableCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

function DraggabbleCard({ toDoId, toDoText, index }: IDraggableCardProps) {
    return (
        <Draggable draggableId={toDoId + ""} index={index}>
            {(magic, snapshot) =>
                <Card
                isDragging={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                >
                    {toDoText}
                </Card>}
        </Draggable>
    )
}

//react momo는 react에게 prop이 바뀌지 않는 
//이상 컴포넌트를 리렌더링 하지 말라고 함
export default React.memo(DraggabbleCard);
