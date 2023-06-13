import "./App.css";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/products/productSlice";
import { useEffect } from "react";
import { Route, Routes, Switch } from "react-router-dom";
import Leftbar from "./components/leftbar/Leftbar";
import Topbar from "./components/topbar/Topbar";
import ProductScreen from "./screen/ProductScreen/ProductScreen";
import StaffScreen from "./screen/StaffScreen/StaffScreen";
import OrderScreen from "./screen/OrderScreen/OrderScreen";

function App() {
  return (
    <>
      <>
        <Topbar />
        <div class="content">
          <div class="content_wrap">
            <Leftbar isProduct={true} isStaff={false} isOrder={false} />
            <Switch>
              <Route exact path="/product" component={ProductScreen} />
              <Route path="/staff" component={StaffScreen} />
              <Route path="/order" component={OrderScreen} />
            </Switch>
          </div>
        </div>
      </>
    </>
  );
}

export default App;
