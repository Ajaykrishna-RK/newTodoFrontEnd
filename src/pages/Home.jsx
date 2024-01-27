import React, { useEffect, useState } from "react";
import { BASE_URL } from "../Common";
import axios from "axios";
import Loading from "../components/loading/Loading";
import EditTodo from "../components/editTodo/EditTodo";

function Home() {
  const [todos, setTodos] = useState([]);
  const [addTask, setAddTask] = useState("");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [loading, setLoading] = useState(false);
  const [iid, setIid] = useState("");
  const [text, setText] = useState("Add Task");

  useEffect(() => {
    getTodos();
  }, [open]);

  const getTodos = async () => {
    setLoading(true);
    try {
      let config = {
        method: "get",
        url: `${BASE_URL}/todos`,
      };
      const response = await axios(config);
      if (response?.status === 201) {
        setTodos(response?.data?.todos);
        setLoading(false);
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
      setText(<Loading />);
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
        setText("Add Task");
        setAddTask("");
        return;
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  const handleClick = (id) => {
    setEditId(id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    setIid(id);
    try {
      setLoading(true);
      let config = {
        method: "delete",
        url: `${BASE_URL}/todos/${id}`,
      };

      const response = await axios(config);
      if (response?.status === 201) {
        const newTodo = todos?.filter((item) => item?._id !== id);
        setTodos(newTodo);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    setAddTask(e.target.value);
  };

  return (
    <div className="bg-[#d6cfcf] pt-5 text-[#000] min-h-[100vh]">
      <div className="lg:w-[70%] w-[95%] bg-[#fff] px-3 shadow-xl mx-auto pb-5 ">
        <p className="text-center text-[24px]   pt-4 uppercase font-[600] ">
          {" "}
          TODO LIST
        </p>

        <>
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
                {text}
              </button>
            </div>
          </form>
          {todos?.length > 0 ? (
            <>
              {todos?.map((item) => (
                <div
                  key={item?.id}
                  className="py-2 w-full flex-shrink-0 bg-gray-200 mt-10 text-gray-700 justify-center items-start lg:flex grid"
                >
                  <div className="text-[16px] w-full text-center  px-4 ">
                    {item?.todo}
                  </div>
                  <div className="lg:mt-0 mt-4 lg:pr-4 items-start w-full justify-center lg:justify-end gap-5 flex  text-[#fff] text-[16px]">
                    <button
                      onClick={() => handleClick(item?._id)}
                      className=" bg-[#4848cf] py-2  px-4 shadow-lg rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item?._id)}
                      className=" bg-[#cb2828] py-2  px-4 shadow-lg rounded-lg"
                    >
                      {iid === item?._id && loading ? <Loading /> : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-[20px] justify-center mt-10 items-center flex  ">
              <p>No Tasks Added</p>
            </div>
          )}
        </>

        {open && editId && (
          <EditTodo
            id={editId}
            setOpen={setOpen}
            setLoading={setLoading}
            loading={loading}
            setTodos={setTodos}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
