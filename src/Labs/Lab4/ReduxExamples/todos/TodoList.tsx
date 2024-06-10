import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todosReducer);
    return (
        <div>
            <h2>Todo List</h2>
            <div className="responsive-table">
                <table className="border">
                    <thead>
                        <TodoForm />
                    </thead>
                    <tbody>
                        {todos.map((todo: any) => (
                            <TodoItem todo={todo} />                            
                        ))}
                    </tbody>
                </table>
            </div>
            <hr />
        </div >
    );
}