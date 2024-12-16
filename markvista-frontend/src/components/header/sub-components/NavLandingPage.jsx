import LinkButton from "../../LinkButton";
import Menus from "../../Menus";
import PageNav from "./PageNav";
import ThemeToggle from "./ThemeToggle";

function NavLandingPage() {
  return (
    <nav className="flex items-center justify-between">
      <ThemeToggle />
      <LinkButton to="/login" />
      <span className="md:hidden">
        <Menus>
          <Menus.Menu>
            <Menus.Toggle id="nav-menu" />
            <Menus.List id="nav-menu">
              <PageNav.PageNavList />
            </Menus.List>
          </Menus.Menu>
        </Menus>
      </span>
    </nav>
  );
}

export default NavLandingPage;
