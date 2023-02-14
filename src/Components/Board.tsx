import { useForm } from "react-hook-form"
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { IToDo, toDoState } from "../atoms";
import { useRecoilState } from "recoil";

const Wrraper = styled.div`
  width: 300px;
  padding: 10px;
  border-radius: 8px;
  min-height: 200px;
  margin-bottom: 50px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  box-shadow: 2px 2px 4px 4px #9ba6a5;
`

const BoardHeader = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Title = styled.h2`
margin-right: 33%;
  display: inline;
  margin-bottom: 10px;
  font-size: 18px;
  color: white;
`;

interface IAreaProps {
    isDraggingOver: boolean
    draggingFromThis: boolean
}

const Area = styled.div<IAreaProps>`
    border-radius: 8px;
    background-color: ${props =>
        props.isDraggingOver ? '#dfe6e9'
            : props.draggingFromThis
                ? '#b2bec3'
                : 'transparent'
    };
    flex-grow: 1; 
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`
//flex-grow : 여백을 채우는 비율

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
        background-color:  white;
        border: 1px solid #e3e3e3;
        border-radius: 5px;
    }
`

const DeleteBoard = styled.button`
    height: 20px;
    font-size: 3px;
    border-radius: 50%;
    border: solid 1px gray;
`

interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
}

interface IForm {
    toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    const [boards, setToDos] = useRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>()
    const onValid = ({ toDo }: IForm) => { //1.toDo
        const newToDo = {
            id: Date.now(),
            text: toDo,
        }
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [boardId]: [
                    newToDo,
                    ...allBoards[boardId],
                ]
            };
        });
        setValue("toDo", ""); //2.toDo
    };
    const onClick = () => {
        const boardsCopy = {...boards};
        delete boardsCopy[boardId];
        setToDos(boardsCopy);
    }
    return (
        <Wrraper>
            <BoardHeader>
                <Title>{boardId}</Title>
                <DeleteBoard onClick={onClick}>X</DeleteBoard>
            </BoardHeader>
            
            <Form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("toDo", { required: true })/*3.toDo 같은 toDo?*/}
                    type="text"
                    placeholder={`Add task on ${boardId}`}
                />
            </Form>
            <Droppable droppableId={boardId}>
                {(magic, info) => ( //droppable과 draggable의 자식은 함수여야 함
                    <Area
                        isDraggingOver={info.isDraggingOver}
                        ref={magic.innerRef}
                        //ref는 리액트 코드를 이용해 HTML 요소를 지정하고,
                        //가져오고 수정할 수 있는 방법이다.
                        {...magic.droppableProps}
                        draggingFromThis={Boolean(info.draggingFromThisWith)}
                    >
                        {toDos.map((toDo, index) => (
                            <DraggableCard
                                key={toDo.id}
                                toDoId={toDo.id}
                                toDoText={toDo.text}
                                index={index}
                                boardId={boardId}
                            />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrraper>
    )
}

export default Board;