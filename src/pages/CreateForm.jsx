import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SideEditor from "../components/SideEditor";
import axiosInstance from "../services/axiosInstance";
import { PiSpinnerGapBold } from "react-icons/pi";

const InputForm = ({ index, input, handleInputClick, deleteInput }) => (
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
);

const CreateForm = ({ item }) => {
  const { id } = useParams();
  const [formState, setFormState] = useState({
    title: item?.title || "",
    inputs: item?.inputs || [],
    inputType: "",
    inputTitle: "",
    placeholder: "",
    selectedInput: null,
    editInput: "",
    editPlaceholder: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const setFormStateField = (field, value) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const validateForm = () => {
    const { title, inputType, inputTitle, placeholder, inputs } = formState;
    if (!title.trim()) return "Form title is required";
    if (!inputType.trim()) return "Input type is required";
    if (!inputTitle.trim()) return "Input title is required";
    if (!placeholder.trim()) return "Placeholder is required";
    if (inputs.length >= 20) return "Maximum of 20 inputs allowed";
    return null;
  };

  const addInput = () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    const { inputType, inputTitle, placeholder, inputs } = formState;
    setFormState({
      ...formState,
      inputs: [...inputs, { type: inputType, title: inputTitle, placeholder }],
      inputType: "",
      inputTitle: "",
      placeholder: "",
      editInput: "",
    });
  };

  const deleteInput = (index) => {
    setFormState({
      ...formState,
      inputs: formState.inputs.filter((_, i) => i !== index),
      selectedInput: null,
    });
  };

  const handleInputClick = (index) => {
    const input = formState.inputs[index];
    setFormState({
      ...formState,
      selectedInput: index,
      editInput: input.title,
      editPlaceholder: input.placeholder,
    });
  };

  const handleEditInputChange = () => {
    const { selectedInput, editInput, editPlaceholder, inputs } = formState;
    setFormState({
      ...formState,
      inputs: inputs.map((input, index) =>
        index === selectedInput
          ? { ...input, title: editInput, placeholder: editPlaceholder }
          : input
      ),
    });
  };

  const saveForm = async () => {
    const { title, inputs } = formState;
    const formData = { title, inputs };

    try {
      setIsLoading(true);
      const url = item ? `/forms/${id}` : "/saveForm";
      await axiosInstance.post(url, formData);
      alert("Form saved successfully!");
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Failed to save form.");
    } finally {
      setIsLoading(false);
    }
  };
  const {
    title,
    inputType,
    inputTitle,
    placeholder,
    inputs,
    selectedInput,
    editInput,
    editPlaceholder,
  } = formState;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-2/3 p-6">
        <h2 className="text-2xl font-bold mb-4">Create Form</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Form Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setFormStateField("title", e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter form title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Input Type:</label>
          <select
            value={inputType}
            onChange={(e) => setFormStateField("inputType", e.target.value)}
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
            onChange={(e) => setFormStateField("inputTitle", e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter input title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Placeholder:</label>
          <input
            type="text"
            value={placeholder}
            onChange={(e) => setFormStateField("placeholder", e.target.value)}
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
          {isLoading ? (
            <PiSpinnerGapBold size={24} className="animate-spin " />
          ) : (
            "Save Form"
          )}
        </button>
        <div className="mt-6">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {inputs.map((input, index) => (
              <InputForm
                key={index}
                index={index}
                input={input}
                handleInputClick={handleInputClick}
                deleteInput={deleteInput}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedInput !== null && (
        <SideEditor
          inputTitle={editInput}
          setInputTitle={(value) => setFormStateField("editInput", value)}
          placeholder={editPlaceholder}
          handleInputChange={handleEditInputChange}
          setPlaceholder={(value) =>
            setFormStateField("editPlaceholder", value)
          }
        />
      )}
    </div>
  );
};

export default CreateForm;
