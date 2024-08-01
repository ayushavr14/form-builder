import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PreviewForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", inputs: [] });
  const [formValues, setFormValues] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `https://form-builder-backend-538n.vercel.app/api/forms/${id}`
        );
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };

    if (id) {
      fetchForm();
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formDataEntries = [...form.entries()];
    alert("Form Submitted");

    const values = formDataEntries.map(([key, value]) => {
      return `${key}: ${value}`;
    });
    setFormValues(values);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Preview Form</h2>
      <h3 className="text-xl font-bold mb-4">{form.title}</h3>
      <div className="space-y-4">
        <form onSubmit={handleSubmit}>
          {form.inputs.map((input, index) => (
            <div key={index} className="border p-3 rounded bg-white shadow-lg">
              <label htmlFor={input._id} className="block mb-2 text-gray-700">
                {input.title}
              </label>
              <input
                name={input.title}
                id={input._id}
                type={input.type}
                placeholder={input.placeholder}
                className="w-full px-3 py-2 border rounded bg-gray-200"
              />
            </div>
          ))}
          <button
            type="submit"
            className="px-4 py-2 bg-green-400 mt-4 text-white"
          >
            Submit
          </button>
        </form>
      </div>
      <h1 className="text-center text-3xl mt-10 font-semibold">
        Submit the form to see the values
      </h1>
      {formValues && (
        <div className="flex flex-col justify-center items-center space-y-2 mt-6">
          {formValues?.map((item, index) => (
            <div key={index}>
              <h2 className="font-medium text-xl">{item}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviewForm;
