import React ,{ useState } from 'react'

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // You can perform additional actions with the selected file, if needed
    // For example, you can upload the file to the server using axios or fetch.
    // Here, we're just logging the file information.
    console.log("Selected File:", file);
  };
  
  return (
<div className="relative  w-4/5 ">
                <label
                  title="Click to upload"
                  htmlFor="button2"
                  className="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group dark:before:bg-darker dark:hover:before:border-gray-500 before:bg-gray-100 dark:before:border-gray-600 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                >
                  <div className="w-max relative">
                    <img
                      className="w-12"
                      src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                      alt="file upload icon"
                      width="512"
                      height="512"
                    />
                  </div>
                  <div className="relative">
                    <span className="block text-base font-semibold relative text-blue-900 dark:text-white group-hover:text-blue-500">
                      {selectedFile ? selectedFile.name : "Upload a file"}
                    </span>
                    <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">
                      Max 2 MB
                    </span>
                  </div>
                </label>
                <input
                  hidden
                  type="file"
                  name="button2"
                  id="button2"
                  onChange={handleFileChange}
                />
              </div>
  )
}

export default FileUpload