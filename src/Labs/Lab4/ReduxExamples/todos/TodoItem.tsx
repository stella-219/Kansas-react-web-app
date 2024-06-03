import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({ todo }: {
    todo: { id: string; title: string};
}) {
    const dispatch = useDispatch();
    return (
            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center ms-1">
                {todo.title}
                <div className="d-flex justify-content-end align-items-center">
                    <button onClick={() => dispatch(setTodo(todo))}
                            id="wd-set-todo-click" className="btn btn-primary text-white ms-2"> Edit </button>
                    <button onClick={() => dispatch(deleteTodo(todo.id))}
                            id="wd-delete-todo-click" className="btn btn-danger text-white ms-2"> Delete </button>
                </div>
            </li>
    );
  }
  