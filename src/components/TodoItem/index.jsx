import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";

import CheckButton from "@/components/CheckButton";
import TodoModal from "@/components/TodoModal";
import { removeTodo, updateTodo } from "@/store/todoSlice";

import "./index.scss";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (todo.status === "completed") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? "uncompleted" : "completed",
      })
    );
  };

  const handleDelete = () => {
    dispatch(removeTodo(todo.id));
    toast.success("Todo deleted successfully!");
  };

  const handleUpdate = () => {
    setShowModal(true);
  };
  return (
    <>
      <motion.div className="item" variants={child}>
        <div className="todoDetails">
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className="texts">
            <p className={`todoText ${todo.status === "completed" ? "todoText--completed" : ""}`}>
              {todo.title}
            </p>
            <p className="time">{dayjs(new Date(todo.time)).format("HH:mm:ss DD MMM YYYY")}</p>
          </div>
        </div>
        <div className="todoActions">
          <div
            className="icon"
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className="icon"
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal type="update" show={showModal} setShow={setShowModal} todo={todo} />
    </>
  );
};

export default TodoItem;
