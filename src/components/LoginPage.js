import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from 'notistack'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const {enqueueSnackbar}=useSnackbar();
  const navigate=useNavigate();
  // useEffect(()=>{
  //   const auth=localStorage.getItem('user');
    
  //   auth && navigate(`/memories/${_id}`);
  // },[navigate])

  const handleSubmit = (event) => {
    event.preventDefault();

    
   
  axios.post('http://localhost:5000/login',JSON.stringify(formData), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  .then((response)=>{
    const userData = response.data;

    if (userData && userData._id) {
    localStorage.setItem("user",JSON.stringify(response.data))
      // const jsonString=localStorage.getItem('user');
      // let userData = JSON.parse(jsonString);
      // let userId = userData._id;
      enqueueSnackbar("Login Successful",{variant:'success'});
      navigate("/memories/:userId")
      //the above line was like navigate(`/memories/${userId}`)
    }else{
      enqueueSnackbar("Invalid credentials", { variant: 'error' });
    }
  })
  .catch((error)=>{
      enqueueSnackbar("Error", { variable: 'error' })
      console.log(error);
  })
  setFormData({
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
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-black">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4 flex items-center justify-between">
            <a
              href="#!"
              className="text-blue-500 hover:underline text-sm dark:text-blue-600"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400"
            
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-black-300">
          Not a member?{" "}
          <Link
            to='/register'
            className="text-blue-500 hover:underline dark:text-blue-600"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
