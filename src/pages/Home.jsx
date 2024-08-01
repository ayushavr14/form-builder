import { useEffect, useState } from "react";
import { PiSpinnerGapBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import FormList from "./FormsList";

const Home = () => {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/forms");
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setIsLoading(false);
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
        <h1 className="text-4xl text-center">Forms</h1>
        <div className="flex justify-center items-center mt-4">
          {isLoading && <PiSpinnerGapBold size={28} className="animate-spin" />}
        </div>
        <div className="mt-5">
          {!forms.length && !isLoading ? (
            <h1 className="text-2xl text-center">No forms created yet</h1>
          ) : (
            <FormList forms={forms} setForms={setForms} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
