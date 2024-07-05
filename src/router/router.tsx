import { Routes, Route } from "react-router-dom";
import { memo } from "react";
import Error from "../views/Error";
import Index from "../views/Index";
import Fashion from "../views/Fashion";
import Electronics from "../views/Electronics";
import Jewelery from "../views/Jewelery";
import Product from "../views/Product";
import CartView from "../components/carts/CartView";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Index />} />
      {/* 라우팅 추가 해보세요. */}
      <Route path="/fashion" element={<Fashion />} />
      <Route path="/jewelery" element={<Jewelery />} />
      <Route path="/electronics" element={<Electronics />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<CartView />} />
    </Routes>
  );
};

export default memo(Router);
