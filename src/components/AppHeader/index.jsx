import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button, { SelectButton } from "../Button";
import TodoModal from "../TodoModal";
import { updateFilter } from "@/store/todoSlice";

import "./index.scss";

const AppHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const initFilter = useSelector((state) => state.todo.filter);
  const [filter, setFilter] = useState(initFilter);

  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    dispatch(updateFilter(e.target.value));
  };

  return (
    <div className="app-header">
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Task
      </Button>
      <SelectButton id="filter" value={filter} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </SelectButton>
      <TodoModal type="add" show={showModal} setShow={setShowModal} />
    </div>
  );
};

export default AppHeader;
