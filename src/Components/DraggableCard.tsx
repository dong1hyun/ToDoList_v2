import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.isDragging ? '#74b9ff' : props.theme.cardColor};
  box-shadow: ${(props) => props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`

const DeleteCard = styled.button`
    float: right;
    font-size: 5px;
    border-radius: 5px;
    border: solid 1px gray;
`

interface IDraggableCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
    boardId: string;
}

function DraggabbleCard({ toDoId, toDoText, index, boardId }: IDraggableCardProps) {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onClick = () => {
        const boardCopy = [...toDos[boardId]];
        boardCopy.splice(index, 1);
        setToDos({
            ...toDos,
            [boardId]: boardCopy
        });
    }
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
                    <DeleteCard onClick={onClick}>삭제</DeleteCard>
                </Card>}
        </Draggable>
    )
}

//react momo는 react에게 prop이 바뀌지 않는 
//이상 컴포넌트를 리렌더링 하지 말라고 함
export default React.memo(DraggabbleCard);
