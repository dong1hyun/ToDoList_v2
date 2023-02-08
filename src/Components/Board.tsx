import { useForm } from "react-hook-form"
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState,  } from "recoil";
import { json } from "stream/consumers";

const Wrraper = styled.div`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  min-height: 200px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
    isDraggingOver: boolean
    draggingFromThis: boolean
}

const Area = styled.div<IAreaProps>`
    border-radius: 5px;
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
        background-color: #bbe4e9;
        border: 1px solid #e3e3e3;
        border-radius: 5px;
    }
`

interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
}

interface IForm {
    toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>()
    const onValid = ({ toDo }: IForm) => { //1.toDo
        const newToDo = {
            id:Date.now(),
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
    return (
        <Wrraper>
            <Title>{boardId}</Title>
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