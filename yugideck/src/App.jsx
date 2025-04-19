import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBars from "./components/NavBars";
import { DataProvider } from "./context/DataContext";
import Main from "./views/Main";

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
