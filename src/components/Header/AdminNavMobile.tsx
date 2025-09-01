import React from "react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import LogoLight from "images/dummy images/light.png";
import LogoDark from "images/dummy images/dark.png";
import { Disclosure } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";

export type NavItemType = {
  id: string;
  name: string;
  href?: string;
  children?: NavItemType[];
};

const NavMobile: React.FC<{ onClickClose?: () => void }> = ({ onClickClose }) => {
  // Detect dark mode using the 'dark' class on body or html
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark") || document.body.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  const navigation = [
    { id: "1", name: "Bookings", href: "/admin-bookings" },
    { id: "2", name: "FAQ", href: "/expert-faq" },
    { id: "3", name: "About Us", href: "/expert-aboutus" },
    {
      id: "4",
      name: "Categories",
      children: [
        { id: "3.1", name: "Stitching", href: "/expert-stitching" },
        { id: "3.2", name: "Plumbing", href: "/expert-plumbing" },
        { id: "3.3", name: "Electrical", href: "/expert-electrical" },
        { id: "3.4", name: "Carpentry", href: "/expert-carpentry" },
        { id: "3.5", name: "Cleaning", href: "/expert-cleaning" },
        { id: "3.6", name: "Gardening", href: "/expert-gardening" },
        { id: "3.7", name: "Painting", href: "/expert-painting" },
        { id: "3.8", name: "Moving", href: "/expert-moving" },
        { id: "3.9", name: "Repair", href: "/expert-repair" },
        { id: "3.10", name: "Installation", href: "/expert-installation" },
        { id: "3.11", name: "Maintenance", href: "/expert-maintenance" },
      ],
    },
  ];

  const renderMenuChild = (item: NavItemType) => (
    <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
      {item.children?.map((i) => (
        <Disclosure key={i.id} as="li">
          <NavLink
            end
            to={i.href || "/adminHomepage"}
            className={({ isActive }) =>
              `flex px-4 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 ${
                isActive ? "text-secondary" : ""
              }`
            }
          >
            <span className={`py-2.5 pr-3 ${!i.children ? "block w-full" : ""}`}>
              {i.name}
            </span>
          </NavLink>
        </Disclosure>
      ))}
    </ul>
  );

  const renderItem = (item: NavItemType) => {
    if (item.name === "Categories") {
      return (
        <Disclosure key={item.id} as="li" className="text-neutral-900 dark:text-white">
          <div className="flex w-full px-4 font-medium uppercase tracking-wide text-sm">
            <span className="py-2.5 pr-3">{item.name}</span>
            <Disclosure.Button as="span" className="py-2.5 flex justify-end flex-1">
              <ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true" />
            </Disclosure.Button>
          </div>
          {item.children && <Disclosure.Panel>{renderMenuChild(item)}</Disclosure.Panel>}
        </Disclosure>
      );
    }

    return (
      <Disclosure key={item.id} as="li" className="text-neutral-900 dark:text-white">
        <NavLink
          end
          to={item.href || "#"}
          className={({ isActive }) =>
            `flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
              isActive ? "text-secondary" : ""
            }`
          }
        >
          <span className={`py-2.5 pr-3 ${!item.children ? "block w-full" : ""}`}>
            {item.name}
          </span>
          {item.children && (
            <Disclosure.Button as="span" className="py-2.5 flex justify-end flex-1">
              <ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true" />
            </Disclosure.Button>
          )}
        </NavLink>
        {item.children && <Disclosure.Panel>{renderMenuChild(item)}</Disclosure.Panel>}
      </Disclosure>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <img src={isDark ? LogoDark : LogoLight} alt="Logo" className="h-8" />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <span>Your One-Stop Shop for Top-Tier Skills & Services!</span>
          <div className="flex justify-between items-center mt-4">
            <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">{navigation.map(renderItem)}</ul>
    </div>
  );
};

export default NavMobile;

// ✅ Ensures the file is treated as a module under --isolatedModules
export {};
