import React, { useEffect, useState } from "react";
import { BASE_URL } from "../Common";
import axios from "axios";

function Home() {
  const [todos, setTodos] = useState([]);
  const [addTask, setAddTask] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      let config = {
        method: "get",
        url: `${BASE_URL}/todos`,
      };
      const response = await axios(config);
      if (response?.status === 201) {
        setTodos(response?.data?.todos);
        return;
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      postTodo();
    } catch (err) {
      console.log(err, "error");
    }
  };

  const postTodo = async () => {
    try {
      if (addTask === "") {
        return alert("Please Type Something");
      }
      let config = {
        method: "post",
        url: `${BASE_URL}/todos`,
        data: {
          todo: addTask,
        },
      };
      const response = await axios(config);
    
      if (response?.status === 201) {
        setTodos((prevTodos) => [...prevTodos, response?.data?.newTodo]);
        return;
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  const handleInputChange = (e) => {
    setAddTask(e.target.value);
  };

  console.log(addTask, todos, "to");

  return (
    <div className="bg-[#d6cfcf] pt-5 text-[#000] min-h-[100vh]">
      <div className="lg:w-[70%] w-[95%] bg-[#fff] px-3 shadow-xl mx-auto pb-5 ">
        <p className="text-center text-[24px]   pt-4 uppercase font-[600] ">
          {" "}
          TODO LIST
        </p>
        <form className="mt-5" onSubmit={handleSubmit}>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            type="text"
            value={addTask}
            onChange={(e) => handleInputChange(e)}
            placeholder="Add Task"
          />

          <div className="text-center">
            <button className="px-5 py-2 rounded-xl font-[600] text-[#fff] bg-[blue]">
              {" "}
              Add Task{" "}
            </button>
          </div>
        </form>

        {todos?.map((item) => (
          <div className="py-2 bg-gray-200 mt-10 text-gray-700 justify-between items-center flex">
            <div className="text-[16px]  px-4 ">{item?.todo}</div>
            <div className="items-center gap-5 flex pr-2 text-[#fff] text-[16px]">
              <button className=" bg-[#4848cf] py-2  px-4 shadow-lg rounded-lg">
                Edit
              </button>
              <button className=" bg-[#cb2828] py-2  px-4 shadow-lg rounded-lg">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
