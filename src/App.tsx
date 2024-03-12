import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layouts/layout";
import Home from "./pages/Home/Index";
import Login from "./pages/Auth/Index";
import Process from "./pages/Dictionary/Process/Index";
import Words from "./pages/Dictionary/Words/Index";
import Mypage from "./pages/Mypage/Index";
import Industry from "./pages/Industry/Index";
import Details from "./pages/Industry/Detail/Index";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dict/process" element={<Process />} />
        <Route path="/dict/words" element={<Words />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/industry/details" element={<Details />} />
      </Routes>
    </Layout>
  );
};

export default App;
