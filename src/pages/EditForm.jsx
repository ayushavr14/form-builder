import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CreateForm from "./CreateForm";
import { CgSpinner } from "react-icons/cg";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", inputs: [] });
  const [edit, setEdit] = useState();
  const [isLoading, setIsLoading] = useState(false);
  console.log(form);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/forms/${id}`
        );
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchForm();
    }
  }, [id]);

  const handleEditing = (input) => {
    setEdit(input);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:5000/api/forms/${id}`, form);
      navigate("/forms");
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  if (isLoading) {
    return <CgSpinner size={28} className="animate-spin" />;
  }

  return (
    <div>
      <CreateForm item={form} />;
    </div>
  );
};

export default EditForm;
