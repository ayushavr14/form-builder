import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiSpinnerGapBold } from "react-icons/pi";
import { useParams } from "react-router-dom";
import CreateForm from "./CreateForm";

const EditForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", inputs: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://form-builder-backend-538n.vercel.app/api/forms/${id}`
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PiSpinnerGapBold size={28} className="animate-spin " />
      </div>
    );
  }

  return (
    <div>
      <CreateForm item={form} />;
    </div>
  );
};

export default EditForm;
