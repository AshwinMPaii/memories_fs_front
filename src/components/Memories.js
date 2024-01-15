import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const Memories = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [memoryData, setMemoryData] = useState([]);
  let jsonString = localStorage.getItem("user");
  let userData = JSON.parse(jsonString);
  let userId = userData._id;

  const getMemories = () => {
    axios
      // .get("http://localhost:5000/memories/")
      .get(`http://localhost:5000/memories/${userId}`)
      .then((response) => {
        const memories = response.data;
        console.log(response.data)
        setMemoryData(memories);
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  useEffect(() => {
    getMemories();
  }, [userId]);

  return (
    // <div className="py-16 px-0">
    //   <div className="text-center">
    //     <h1 className="text-3xl font-serif">Memories</h1>
    //   </div>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto ">
    //     {memoryData.map((memory, index) => (
    //       <div className="max-w-sm rounded overflow-hidden shadow-lg">
    //         {/* Image */}
    //         <img className="w-full" src={memory.imagePath} alt={`Memory ${index}`} />

    //         <div className="px-6 py-4">
    //           {/* Title */}
    //           <div className="font-bold text-xl mb-2">{memory.title}</div>

    //           {/* Date, Location, Mood, Weather */}
    //           <div className="mb-2">
    //             <span className="text-gray-700">Date: {memory.date}</span>
    //             <span className="mx-2 text-gray-700">
    //               Location: {memory.location}
    //             </span>
    //             <span className="mx-2 text-gray-700">Mood: {memory.mood}</span>
    //             <span className="mx-2 text-gray-700">
    //               Weather: {memory.weather}
    //             </span>
    //           </div>

    //           {/* Description */}
    //           <p className="text-gray-600 text-base">{memory.description}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="py-16 px-4 mx-auto w-full min-h-screen dark:bg-pink-200">
  <div className="text-center mb-8">
    <h1 className="text-5xl font-Dancing">Memories</h1>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
    {
    Array.isArray(memoryData) ? (
    memoryData.map((memory, index) => (
      <div key={index} className="grid grid-rows-2 max-w-sm rounded overflow-hidden shadow-lg mx-auto">
        {/* Image */}
        <img className="w-full h-full" src={memory.imagePath} alt={`Memory ${index}`} />

        <div className="px-6 py-4 dark:bg-gray-600">
          {/* Title */}
          <div className="font-bold text-xl mb-2 font-Roboto">{memory.title}</div>

          {/* Date, Location, Mood, Weather */}
          <div className="flex flex-col mb-2">
            <div className="text-gray-700 font-Rampart dark:text-white">{memory.date}</div>
            <div className="mx-2 text-gray-700 font-Afacad dark:text-white">
              {memory.location}
            </div>
            <div className="mx-2 text-gray-700 font-Afacad dark:text-white">{memory.mood}</div>
            <div className="mx-2 text-gray-700 font-Afacad dark:text-white">
              {memory.weather}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-base font-Dancing dark:text-white">{memory.description}</p>
        </div>
      </div>
    ))):(
      <p>Memory data is not an array</p>
    )}
  </div>
</div>

  );
};

export default Memories;
