import BreadCrumb from "../components/common/Breadcrumb";
import { MENUS } from "../constants/category";
import ItemList from "../pages/ItemList";

const Electronics = (): JSX.Element => {
  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <BreadCrumb category={MENUS.HOME} crumb={MENUS.DIGITAL} />
      <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <ItemList category={"electronics"} name={"디지털"}></ItemList>
      </article>
    </section>
  );
};

export default Electronics;
