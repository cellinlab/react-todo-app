import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

import Button from "../Button";
import { addTodo, updateTodo } from "@/store/todoSlice";
import { uid } from "@/util";

import "./index.scss";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 500,
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transform: "scale(0.9)",
  },
};

const TodoModal = ({ type, show, setShow, todo }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("uncompleted");

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("uncompleted");
    }
  }, [type, todo, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Title is required");
      return;
    }
    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uid(),
            title,
            status,
            time: new Date().getTime(),
          })
        );
      } else {
        dispatch(
          updateTodo({
            ...todo,
            title,
            status,
          })
        );
      }
      setShow(false);
    }
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="container"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="closeBtn"
              onKeyDown={() => setShow(false)}
              onClick={() => setShow(false)}
              role="button"
              tabIndex={0}
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
              <h1 className="form-title">{type === "add" ? "Add Todo" : "Update Todo"}</h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                Status
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="uncompleted">Uncompleted</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
              <div className="button-container">
                <Button type="submit" variant="primary">
                  {type === "add" ? "Add" : "Update"}
                </Button>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TodoModal;
