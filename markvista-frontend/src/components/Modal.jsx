import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick();

  if (openName !== name) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-50 h-screen w-full bg-[rgba(0,0,0,0.5)] backdrop-blur-[4px] transition-all duration-500">
      <div
        ref={ref}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-8 shadow-lg transition-all duration-500 dark:bg-gray-800"
      >
        <button
          onClick={close}
          className="absolute right-5 top-3 translate-x-2 transform rounded-sm border-none bg-none p-1 transition-all duration-200 hover:bg-gray-200"
        >
          <HiXMark className="h-6 w-6 text-gray-500" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
