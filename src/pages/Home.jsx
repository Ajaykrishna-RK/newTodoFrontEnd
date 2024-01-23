import React from "react";

function Home() {
  return (
    <div className="bg-[#d6cfcf] pt-5 text-[#000] min-h-[100vh]">
      <div className="lg:w-[70%] w-[95%] bg-[#fff] px-3 shadow-xl mx-auto pb-5 ">
     
          <p className="text-center text-[24px]   pt-4 uppercase font-[600] ">
            {" "}
            TODO LIST
          </p>
          <form className="mt-5">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
               
                type="text"
                placeholder="Add Task"
              />
           
            <div className="text-center">
            <button className="px-5 py-2 rounded-xl font-[600] text-[#fff] bg-[blue]"> Add Task </button>
            </div>
          </form>
      
      </div>
    </div>
  );
}

export default Home;
