import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/layout";
import Home from "./pages/Home/Index";
import Login from "./pages/Auth/Index";
import Process from "./pages/Dictionary/Process/Index";
import Words from "./pages/Dictionary/Words/Index";
import Description from "./pages/Dictionary/Description/Index";
import Mypage from "./pages/Mypage/Index";
import Industry from "./pages/Industry/Index";
import Details from "./pages/Industry/Detail/Index";
import StockPrice from "./pages/Industry/StockPrice/Index";
import LoginRedirectHandler from "api/auth/LoginRedirectHandler";
import { WordsProvider } from "components/SideBar/DictionarySideBar/WordsContext";
import { MyPageDataProvider } from "api/mypage/mypageDataContext";
import { RecoilRoot } from "recoil";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <MyPageDataProvider>
        <WordsProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/oauth2/kakao" element={<LoginRedirectHandler />} />
              <Route path="/dict/process" element={<Process />} />
              <Route path="/dict/words" element={<Words />}>
                <Route path=":category" element={<Description />} />
              </Route>
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/industry" element={<Industry />} />
              <Route path="/industry/details" element={<Details />} />
              <Route path="/industry/:name" element={<StockPrice />} />
            </Routes>
          </Layout>
        </WordsProvider>
      </MyPageDataProvider>
    </RecoilRoot>
  );
};

export default App;
