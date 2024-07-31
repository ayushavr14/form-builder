import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateForm from "./pages/CreateForm";
import FormList from "./pages/FormsList";
import PreviewForm from "./pages/PreviewForm";
import EditForm from "./pages/EditForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/forms" element={<FormList />} /> */}
      <Route path="/form/create" element={<CreateForm />} />
      <Route path="/form/:id/edit" element={<EditForm />} />
      <Route path="/form/:id" element={<PreviewForm />} />
    </Routes>
  );
};

export default App;
