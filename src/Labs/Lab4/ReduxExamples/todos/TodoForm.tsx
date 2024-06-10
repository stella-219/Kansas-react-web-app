import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { useSelector, useDispatch } from "react-redux";

export default function TodoForm() {
    const dispatch = useDispatch();
    const { todo } = useSelector((state: any) => state.todosReducer);
    return (
        <tr className="border">
            <th>
                <input className="border rounded mt-1 mb-1 ms-2 me-5" value={todo.title}
                    onChange={(e) =>
                        dispatch(setTodo({ ...todo, title: e.target.value }))
                    }
                />
            </th>
            <th>
                <button onClick={() => dispatch(updateTodo(todo))}
                    id="wd-update-todo-click"
                    className="btn btn-warning me-2 mt-2 mb-2">
                    Update
                </button>
                <button onClick={() => dispatch(addTodo(todo))}
                    id="wd-add-todo-click"
                    className="btn btn-success me-2 mt-2 mb-2">
                    Add
                </button>
            </th>
        </tr>
    );
}
