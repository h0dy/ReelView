import { NavLink } from "react-router-dom";

const navLinkClasses = "hover:underline font-semibold capitalize";

const NavItem = ({ label, href }: { label: string; href: string }) => {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${navLinkClasses} underline` : navLinkClasses
        }
        to={href}
      >
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;
