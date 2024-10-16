import axios from "axios";
import React, { useState } from "react";
import { FaFileWord } from "react-icons/fa";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");
  console.log(selectedFile);

  const handleFilechange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!selectedFile) {
      setConvert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        "http://localhost:3000/convertFile",
        formData,
        {
          responseType: "blob", // word files image are part of binary
        }
      );
      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      setDownloadError("");
      setConvert("File Converted Successfully");
    } catch (error) {
      if (error.response && error.response.status == 400) {
        setDownloadError("Failed to convert file", error.response.data.message);
      } else {
        setConvert("");
      }
    }
  };
  return (
    <section className="flex justify-center items-center h-screen bg-gray-700">
      <div className="max-w-lg mx-auto p-8 bg-slate-100 shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Convert Word to PDF
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Upload your Word documents and convert them to PDF instantly, with no
          software required.
        </p>
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept=".doc, .docx"
            onChange={handleFilechange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="w-full bg-blue-50 border-2 border-dashed border-gray-500 rounded-lg p-6 text-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-200 flex items-center justify-center cursor-pointer"
          >
            <FaFileWord className="text-3xl" />
            <span className="ml-3 text-xl font-semibold">
              {selectedFile ? selectedFile.name : "Choose File"}
            </span>
          </label>
          <button
            onClick={handleSubmit}
            disabled={!selectedFile} // if not selected file then keep disabled
            className="mt-6 disabled:bg-gray-300 disabled:pointer-events-none bg-blue-600 text-gray-300 py-3 px-6 rounded-lg w-full max-w-xs text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Convert File
          </button>
          {convert && (
            <div className="text-center mt-4 font-semibold text-blue-800">
              {convert}
            </div>
          )}
          {downloadError && (
            <div className="text-center mt-4 font-semibold text-red-700">
              {downloadError}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
