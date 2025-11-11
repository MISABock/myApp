import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import StockList from "./StockList";
import MyData from "./MyData";
import Settings from "./Settings";
import WatchList from "./WatchList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home/:id" element={<Home />} />
        <Route path="/home/:id/stocklist" element={<StockList />} />
        <Route path="/home/:id/mydata" element={<MyData />} />
        <Route path="/home/:id/settings" element={<Settings />} />

        <Route path="/home/:id/watchlist" element={<WatchList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
