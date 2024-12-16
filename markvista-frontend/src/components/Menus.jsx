import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Button from "./Button";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({});

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, type, children }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const buttonElement = e.target.closest("button");
    const rect = buttonElement.getBoundingClientRect();

    if (!buttonElement) {
      console.error("Button element not found");
      return;
    }

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }

  if (type === "custom")
    return (
      <Button onClick={handleClick} type="round">
        {openId === "" && children}
        {openId === id && <RxCross2 />}
      </Button>
    );
  return (
    <button
      onClick={handleClick}
      // className="mb-1 transform rounded-lg bg-gray-300 p-[6px] text-[18px] transition-all duration-200 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 border-opacity-55 bg-gray-400 text-[18px] text-gray-700 transition-all duration-200 hover:bg-gray-300 lg:h-10 lg:w-10 lg:text-2xl dark:bg-[var(--color-background)] dark:text-gray-300 dark:hover:bg-gray-700"
    >
      {openId === "" && <GiHamburgerMenu />}
      {openId === id && <RxCross2 />}
    </button>
  );
}
function List({ children, id }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);

  if (id !== openId) return null;

  return createPortal(
    <ul
      ref={ref}
      style={{ right: `${position.x}px`, top: `${position.y}px` }}
      className="fixed rounded-md border border-gray-200 bg-white shadow-md transition-all duration-200 dark:border-[var(--color-section)] dark:bg-[var(--color-background)]"
    >
      {children}
    </ul>,
    document.body,
  );
}

// function Button({ children, icon, onClick = () => {} }) {
//   const { close } = useContext(MenusContext);
//   function handleClick() {
//     onClick?.();
//     close();
//   }

//   return (
//     <button
//       onClick={handleClick}
//       className="flex w-full items-center gap-4 border-none bg-none px-6 py-3 text-left text-base transition-all duration-200 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
//     >
//       {icon}
//       <span>{children}</span>
//     </button>
//   );
// }

Menus.Menu = function Menu({ children }) {
  return <div className="flex items-center justify-end">{children}</div>;
};
Menus.Toggle = Toggle;
Menus.List = List;
// Menus.Button = Button;

export default Menus;
