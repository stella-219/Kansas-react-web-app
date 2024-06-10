import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({
    todo }: {
        todo: { id: string; title: string };
    }) {
    const dispatch = useDispatch();
    return (
        <tr key={todo.id} className="border">
            <td>
                <div className="ms-2">
                    {todo.title}
                </div>
            </td>
            <td>
                <button onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click"
                    className="btn btn-primary me-2 mt-2 mb-2">
                    Edit
                </button>
                <button onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click"
                    className="btn btn-danger me-2 mt-2 mb-2">
                    Delete
                </button>
            </td>
        </tr>
    );
}
