import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../Common";
import axios from "axios";
import Loading from "../Loading";

function EditTodo({ id, setOpen, setTodos, setLoading, loading }) {
  const [todoById, setTodoById] = useState();
  const [editTask, setEditTask] = useState("");

  useEffect(() => {
    getTodoById(id);
  }, []);

  const getTodoById = async (id) => {
    try {
      let config = {
        method: "get",
        url: `${BASE_URL}/todos/${id}`,
      };
      const response = await axios(config);
      if (response?.status === 201) {
        setTodoById(response?.data);
        return;
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateTodo(id);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTodo = async (id) => {
    try {
      if (editTask === "") {
        return alert("Please Type Something");
      }
      setLoading(true);
      let config = {
        method: "patch",
        url: `${BASE_URL}/todos/${id}`,
        data: {
          todo: editTask,
        },
      };
      const response = await axios(config);

      if (response?.status === 201) {
        setTodos((prevTodos) => [...prevTodos, response?.data?.updatedTodo]);
        setLoading(false);
        setOpen(false);
        return;
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  const handleInputChange = (e) => {
    setEditTask(e.target.value);
  };

  return (
    <div className="fixed top-[15%] left-0 right-0  lg:w-[60%] w-[75%] bg-[#fff] px-3 shadow-xl mx-auto pb-5 ">
      <p className="text-center text-[14px]   pt-4 uppercase font-[600] ">
        {" "}
        Edit Todo
      </p>
      {todoById ? (
        <>
          {loading ? (
            <Loading />
          ) : (
            <form className="mt-5" onSubmit={handleSubmit}>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                type="text"
                defaultValue={todoById?.todo}
                onChange={(e) => handleInputChange(e)}
                placeholder=""
              />

              <div className="items-center flex justify-center gap-5">
                <button
                  onClick={() => setOpen(false)}
                  className="px-5 py-2 rounded-xl font-[600] text-[#ede2e2] bg-[#4e4e57]"
                >
                  {" "}
                  Close
                </button>
                <button className="px-5 py-2 rounded-xl font-[600] text-[#fff] bg-[blue]">
                  {" "}
                  Edit Task{" "}
                </button>
              </div>
            </form>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default EditTodo;
