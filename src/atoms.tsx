import { atom } from "recoil";

export interface IToDo {
    id: number;
    text: string
}

interface IToDoState {
    //App.tsx의 Board요소의 toDos={toDos[boardId] 속성에서
    //tsx는 to_do, doing, done만 오는 것으로 알고 있음
    //그래서 오류가 뜨기 때문에 형식을 알려줘야 함
    [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [],
        Doing: [],
        Done: [],
    }
})