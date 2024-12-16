import { HashLink } from "react-router-hash-link";

function PageNavItem({ name, href, to = "nearest" }) {
  return (
    <li>
      <HashLink
        smooth
        scroll={(el) =>
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: to,
            duration: 2000,
          })
        }
        to={`#${href}`}
        className="bg-primary-700 lg:text-primary-700 block rounded py-2 pl-3 pr-4 text-gray-700 lg:bg-transparent lg:p-0 dark:text-white"
      >
        {name}
      </HashLink>
    </li>
  );
}

export default PageNavItem;
