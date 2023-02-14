import { useEffect } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import CategoryAdd from "./Components/CategoryAdd";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 50vh;
`

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10%;
  margin: none;
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  useEffect(() => {
    const JtoDos = localStorage.getItem('toDoList');
    if (JtoDos !== null && typeof (JtoDos) === "string") {
      setToDos(JSON.parse(JtoDos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDos));
  }, [toDos]);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      setToDos((allBoards) => { //allBoards는 읽기 전용
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index]
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj)
        return {
          ...allBoards, //{}안에서는 객체도 ...(전개연산자) 사용가능
          [source.droppableId]: boardCopy // key값에 변수값을 넣으려면 대괄호[]를 써야함
        };
      })
    }
    else {
      setToDos((allBoard) => {
        const sourceBoard = [...allBoard[source.droppableId]];
        const taskObj = sourceBoard[source.index]
        const targetBoard = [...allBoard[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard
        }
      })
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CategoryAdd />
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map(boardId => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />)}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
export default App;
