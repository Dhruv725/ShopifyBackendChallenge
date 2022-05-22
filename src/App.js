import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import InvetoryItems from "./Components/Inventory";
import EditForm from "./Components/editForm";
import DeleteItem from "./Components/DeleteItem";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InvetoryItems />} />
          <Route path="/editForm/:id" element={<EditForm />} />
          <Route path="/delete/:id" element={<DeleteItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
