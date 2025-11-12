import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import StockList from "./StockList";
import MyData from "./MyData";
import Settings from "./Settings";
import WatchList from "./WatchList";
import LogoutSuccessPage from "./LogoutSuccessPage"; // <--- import hinzufügen

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home/:id" element={<Home />} />
        <Route path="/home/:id/stocklist" element={<StockList />} />
        <Route path="/home/:id/mydata" element={<MyData />} />
        <Route path="/home/:id/settings" element={<Settings />} />
        <Route path="/home/:id/watchlist" element={<WatchList />} />
        <Route path="/logout-success" element={<LogoutSuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
