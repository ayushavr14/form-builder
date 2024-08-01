import React, { useState } from "react";
import axios from "axios"; // Assuming you are using axios for API calls
import SideEditor from "../components/SideEditor";
import { useParams } from "react-router-dom";

const CreateForm = ({ item }) => {
  const { id } = useParams();
  const [formTitle, setFormTitle] = useState(item?.title || "");
  const [inputs, setInputs] = useState(item?.inputs || []);
  const [inputType, setInputType] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [selectedInput, setSelectedInput] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [editPlaceholder, setEditPlaceholder] = useState("");

  const addInput = () => {
    if (formTitle.trim() === "") {
      alert("Form title is required");
      return;
    }
    if (inputType.trim() === "") {
      alert("Input type is required");
      return;
    }

    if (inputTitle.trim() === "") {
      alert("Input title is required");
      return;
    }

    if (placeholder.trim() === "") {
      alert("Placeholder is required");
      return;
    }

    if (inputs.length < 20) {
      setInputs([
        ...inputs,
        { type: inputType, title: inputTitle, placeholder },
      ]);
      setInputType("");
      setInputTitle("");
      setPlaceholder("");
      setEditInput("");
    } else {
      alert("Maximum of 20 inputs allowed");
    }
  };

  const deleteInput = (index) => {
    setInputs(inputs.filter((_, i) => i !== index));
    setSelectedInput(null);
  };

  const handleInputClick = (index) => {
    setSelectedInput(index);
    setInputTitle(inputs[index].title);
    setEditPlaceholder(inputs[index].placeholder);
    setEditInput(inputs[index].title);
  };

  const handleEditInputChange = () => {
    const updatedInputs = inputs.map((input, index) =>
      index === selectedInput
        ? { ...input, title: editInput, placeholder: editPlaceholder }
        : input
    );
    setInputs(updatedInputs);
  };

  const saveForm = async () => {
    const formData = {
      title: formTitle,
      inputs: inputs,
    };

    try {
      if (item) {
        await axios.post(
          `https://form-builder-backend-538n.vercel.app/api/forms/${id}`,
          formData
        );
      } else {
        await axios.post(
          "https://form-builder-backend-538n.vercel.app/api/saveForm",
          formData
        );
      }
      alert("Form saved successfully!");
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Failed to save form.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-2/3 p-6">
        <h2 className="text-2xl font-bold mb-4">Create Form</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Form Title:</label>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter form title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Input Type:</label>
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select input type</option>
            <option value="email">Email</option>
            <option value="text">Text</option>
            <option value="password">Password</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Input Title:</label>
          <input
            required
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter input title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Placeholder:</label>
          <input
            type="text"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter placeholder"
          />
        </div>
        <button
          onClick={addInput}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Input
        </button>
        <button
          disabled={inputs.length === 0}
          onClick={saveForm}
          className="bg-green-500 text-white py-2 px-4 rounded ml-4 hover:bg-green-600 disabled:bg-slate-300"
        >
          Save Form
        </button>
        <div className="mt-6">
          <h3 className="text-xl font-bold">{formTitle}</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {inputs.map((input, index) => (
              <div
                key={index}
                className="border p-3 rounded bg-white flex justify-between items-center"
              >
                <div className="cursor-pointer flex-1">
                  <label className="block text-gray-700">{input.title}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    readOnly
                    className="w-full px-3 py-2 border rounded bg-gray-200 cursor-not-allowed"
                  />
                </div>
                <button
                  className="ml-4 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-500"
                  onClick={() => handleInputClick(index)}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteInput(index)}
                  className="ml-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedInput !== null && (
        <SideEditor
          inputTitle={editInput}
          setInputTitle={setEditInput}
          placeholder={editPlaceholder}
          handleInputChange={handleEditInputChange}
          setPlaceholder={setEditPlaceholder}
        />
      )}
    </div>
  );
};

export default CreateForm;
