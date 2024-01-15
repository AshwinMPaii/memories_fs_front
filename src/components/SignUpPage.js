import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    auth && navigate("/memories");
  }, [navigate]);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/register", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const result = response.data;
        //console.log(result);
        enqueueSnackbar("Registration Successful", { variant: "success" });
        localStorage.setItem("user", JSON.stringify(result));
        const jsonString=localStorage.getItem('user');
        let userData = JSON.parse(jsonString);
        let userId = userData._id;
        navigate(`/memories/${userId}`);
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    })); //returning an object
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300 dark:bg-gray-700">
       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-300 dark:text-black">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 dark:text-black"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 dark:text-black"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 dark:text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400"
          >
            Register
          </button>
          <div className="mb-4 flex items-center justify-between">
            <Link
              to='/login'
              className="text-blue-500 hover:underline text-sm dark:text-blue-600"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>

    </div>
  );
}
