import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const FormList = ({ forms, setForms }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/forms/${id}`);
      setForms(forms.filter((form) => form._id !== id));
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="grid grid-cols-1 gap-4">
        {forms?.map((form) => (
          <div key={form._id} className="border p-3 rounded bg-white shadow-lg">
            <h3 className="text-xl font-bold mb-2">{form.title}</h3>
            <div className="flex gap-2">
              <Link to={`/form/${form._id}/edit`}>
                <button className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">
                  Edit
                </button>
              </Link>
              <Link to={`/form/${form._id}`}>
                <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                  Preview
                </button>
              </Link>
              <button
                onClick={() => handleDelete(form._id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormList;
