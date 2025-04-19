import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBars from "./components/NavBars";
import Main from "./views/Main";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <NavBars />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
