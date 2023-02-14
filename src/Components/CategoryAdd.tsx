import { useForm } from "react-hook-form";
import styled from "styled-components";
import { toDoState } from "../atoms";
import { useRecoilState } from "recoil";

const Form = styled.form`
    display: flex;
    justify-content: flex-end;
    margin: 50px 50px;
    input {
        background-color:  white;
        border: 1px solid #a9a9a9;
        border-radius: 5px;
    }
    button {
        border-radius: 5px;
        border: 1px solid #a9a9a9;
    }
`

interface IForm {
    category: string
}

function CategoryAdd() {
    const [boards, setToDos] = useRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>()
    const onValid = ({ category }: IForm) => {
        const categoryLength = Object.keys(boards).length;
        console.log(categoryLength);
        if(categoryLength >= 6) { //category 최대 개수 제한
            return;
        }
        const boardsCopy = {...boards};
        boardsCopy[category] = [];
        setToDos(boardsCopy);
        setValue("category", "");
    }
    return (
        <>
            <Form onSubmit={handleSubmit(onValid)}>
                +
                <input
                    {...register("category", { required: true })}
                    placeholder="Enter Category"
                    type="text"
                />
                <button>Add</button>
            </Form>

        </>

    )
}

export default CategoryAdd;