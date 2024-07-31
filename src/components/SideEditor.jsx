import React from "react";

const SideEditor = ({
  inputTitle,
  setInputTitle,
  handleInputChange,
  placeholder,
  setPlaceholder,
}) => {
  return (
    <div className="w-1/3 p-6 bg-white border-l border-gray-200">
      <h2 className="text-xl font-bold mb-4">Edit Input</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Input Title:</label>
        <input
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
        onClick={handleInputChange}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Save Changes
      </button>
    </div>
  );
};

export default SideEditor;
