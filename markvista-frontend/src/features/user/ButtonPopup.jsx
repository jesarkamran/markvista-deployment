import Menus from "../../components/Menus";

function ButtonPopup({ children, Logo }) {
  return (
    <>
      <Menus>
        <Menus.Menu>
          <Menus.Toggle id="pop-menu" type="custom">
            <Logo />
          </Menus.Toggle>
          <Menus.List id="pop-menu">{children}</Menus.List>
        </Menus.Menu>
      </Menus>
    </>
  );
}

export default ButtonPopup;
