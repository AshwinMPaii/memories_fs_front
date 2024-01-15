import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const AddMemory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const result = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [memoryData, setMemoryData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    mood: "",
    weather: "",
    imagePath: null,
    // This will be used for file input
    userId: "",
  });
  const [error,setError]=useState(false)

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemoryData((prevData) => ({
      ...prevData,
      [name]: value,
      userId: result._id,
    }));
    setError(false);
  };

  const handleFileChange = (e) => {
    console.log(e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setMemoryData((prevData) => ({
        ...prevData,
        imagePath: reader.result, // reader.result contains the file data as a data URL
      }));
    };
    reader.onerror = (error) => {
      console.log("Error:", error);
    };
    
  };
 

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!memoryData.title||!memoryData.date||!memoryData.location||!memoryData.description||!memoryData.mood||!memoryData.weather||!memoryData.imagePath){
      setError(true);
      return false;
    }
    const jsonString=localStorage.getItem('user');
      let userData = JSON.parse(jsonString);
      let userId = userData._id;

    axios
      .post(
        `http://localhost:5000/memories/add-memory/${userId}`,
        JSON.stringify(memoryData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const result = response.data;
        console.log(result);
        enqueueSnackbar("Memory Added Successfully", { variant: "success" });
        
        navigate(`/memories/${userId}`);
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
    setMemoryData({
      title: "",
      date: "",
      location: "",
      description: "",
      mood: "",
      weather: "",
      imagePath: null,
    });

    console.log("Memory Data:", memoryData);
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 my-20 snap-y">
      <h1 className="text-xl font-bold text-white capitalize dark:text-white">
        Add Memory
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-white dark:text-gray-200" htmlFor="username">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              value={memoryData.title}
              onChange={handleInputChange}
            ></input>
            {error && !memoryData.title && <span className="text-base font-mono text-red-500">Enter valid name</span>}
          </div>
          <div>
            <label className="text-white dark:text-gray-200" htmlFor="username">
              Location
            </label>
            <input
              id="title"
              type="text"
              name="location"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              value={memoryData.location}
              onChange={handleInputChange}
            ></input>
            {error && !memoryData.location && <span className="text-base font-mono text-red-500">Enter valid location</span>}
          </div>

          <div>
            <label
              className="text-white dark:text-gray-200"
              htmlFor="passwordConfirmation"
            >
              Mood
            </label>
            <select
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              value={memoryData.mood}
              onChange={handleInputChange}
              name="mood"
            >
              <option>Happy</option>
              <option>Excited</option>
              <option>Peaceful</option>
              <option>Romantic</option>
            </select>
          </div>
          <div>
            <label
              className="text-white dark:text-gray-200"
              htmlFor="passwordConfirmation"
            >
              Weather
            </label>
            <select
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              value={memoryData.weather}
              onChange={handleInputChange}
              name="weather"
            >
              <option>Sunny</option>
              <option>Cloudy</option>
              <option>Rainy</option>
              <option>Windy</option>
            </select>
          </div>
          <div>
            <label
              className="text-white dark:text-gray-200"
              htmlFor="passwordConfirmation"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              value={memoryData.date}
              onChange={handleInputChange}
              name="date"
            ></input>
            {error && !memoryData.date && <span className="text-base font-mono text-red-500">Enter valid Date</span>}
          </div>
          <div>
            <label
              className="text-white dark:text-gray-200"
              htmlFor="passwordConfirmation"
            >
              Description
            </label>
            <textarea
              id="textarea"
              type="textarea"
              className="block w-full px-4 py-4 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              value={memoryData.description}
              onChange={handleInputChange}
              name="description"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {/* can put image here to display after uploading */}
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-white"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span className="">Upload a file</span>
                    <input
                      id="file-upload"
                      name="imagePath"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange}
                    ></input>
                  </label>
                  <p className="pl-1 text-white">or drag and drop</p>
                </div>
                <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            <div></div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddMemory;
