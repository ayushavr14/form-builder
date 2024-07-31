import { Link } from "react-router-dom";
import FormList from "./FormsList";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/forms");
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-5 justify-center items-center mt-8">
        <h1 className="text-5xl">Welcome to Form.com</h1>
        <p className="text-xl">This is a simple form builder</p>
        <Link to="/form/create" className="px-4 py-2 bg-green-600 text-white">
          CREATE NEW FORM
        </Link>
      </div>
      <hr className="mt-7 border-b" />
      <div className="mt-5 p-4">
        <h1 className="text-4xl">Forms</h1>
        <div className="mt-5">
          {!forms.length ? (
            <h1 className="text-lg mt-2">You have no forms created yet</h1>
          ) : (
            <FormList forms={forms} setForms={setForms} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
