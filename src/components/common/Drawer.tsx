// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Drawer = (): JSX.Element => {
//   const [isOpen, setIsOpen] = useState(false);

//   const closeDrawer = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="drawer-side">
//       <label
//         htmlFor="side-menu"
//         className="drawer-overlay"
//         onClick={closeDrawer}
//       ></label>
//       <ul className="menu w-60 sm:w-80 p-4 overflow-y-auto bg-white dark:bg-base-100">
//         {/* 모바일 메뉴를 노출시켜 보세요. */}
//         <li>
//           <Link to={"/fashion"} onClick={closeDrawer}>
//             패션
//           </Link>
//         </li>
//         <li>
//           <Link to={"/jewelery"}>액세서리</Link>
//         </li>
//         <li>
//           <Link to={"/electronics"}>디지털</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Drawer;
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Drawer = (): JSX.Element => {
  const buttonBRef = useRef<HTMLLabelElement>(null);

  const handleClickA = () => {
    if (buttonBRef.current) {
      buttonBRef.current.click();
    }
  };

  return (
    <div className={`drawer-side `}>
      <label
        htmlFor="side-menu"
        className={`drawer-overlay `}
        ref={buttonBRef}
      ></label>
      <ul className="menu w-60 sm:w-80 p-4 overflow-y-auto bg-white dark:bg-base-100">
        <li>
          <Link to={"/fashion"} onClick={handleClickA}>
            패션
          </Link>
        </li>
        <li>
          <Link to={"/jewelery"} onClick={handleClickA}>
            액세서리
          </Link>
        </li>
        <li>
          <Link to={"/electronics"} onClick={handleClickA}>
            디지털
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
