import PageNavItem from "./PageNavItem";

function PageNav() {
  return (
    <div
      className={`hidden items-center justify-between md:flex`}
      id="mobile-menu-2"
    >
      <PageNavList />
    </div>
  );
}

function PageNavList() {
  return (
    <ul className={`font-medium md:flex lg:space-x-8`}>
      <PageNavItem name="Home" href="home" to="start" />
      <PageNavItem name="Services" href="services" to="center" />
      <PageNavItem name="Marketplace" href="market" />
      <PageNavItem name="Team" href="team" />
      <PageNavItem name="Contact" href="contact" />
    </ul>
  );
}

PageNav.PageNavList = PageNavList;
export default PageNav;
