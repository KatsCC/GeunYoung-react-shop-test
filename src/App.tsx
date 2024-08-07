import "./assets/css/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import Drawer from "./components/common/Drawer";
import Router from "./router/router";
import Nav from "./views/Nav";
import Product from "./views/HomeProduct";
import Footer from "./views/Footer";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <input type="checkbox" id="side-menu" className="drawer-toggle" />
      <section className="drawer-content">
        {/* Nav를 렌더링 하세요 */}
        <Nav></Nav>
        <section className="main pt-16">
          <Router />
        </section>
        {/* Footer를 렌더링 하세요 */}
        <Footer></Footer>
      </section>
      <Drawer />
    </BrowserRouter>
  );
};

export default App;
