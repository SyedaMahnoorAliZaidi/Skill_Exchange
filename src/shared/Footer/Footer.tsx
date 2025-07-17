import Logo from "images/dummy images/TaskEase logo.jpg";

import { CustomLink } from "data/types";
import React from "react";
import { Link } from "react-router-dom";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "1",
    title: "Services",
    menus: [
      { href: "/stitching", label: "Stitching & Tailoring" },
      { href: "/plumbing", label: "Plumbing Services" },
      { href: "/electrical", label: "Electrical Work" },
      { href: "/carpentry", label: "Carpentry & Woodwork" },
      { href: "/cleaning", label: "Home Cleaning" },
      { href: "/gardening", label: "Gardening & Landscaping" },
      { href: "/painting", label: "Painting Services" },
      { href: "/moving", label: "Moving & Relocation" },
      { href: "/repair", label: "Repair & Maintenance" },
      { href: "/installation", label: "Installation Services" },
    ],
  },
  {
    id: "2",
    title: "Company",
    menus: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQ" },
      { href: "/signup", label: "Join as Expert" },
      { href: "/login", label: "Login" },
    ],
  },
  {
    id: "3",
    title: "Support",
    menus: [
      { href: "/contact", label: "Customer Support" },
      { href: "/faq", label: "Help Center" },
      { href: "/about", label: "How It Works" },
      { href: "/contact", label: "Report an Issue" },
      { href: "/contact", label: "Feedback" },
    ],
  },
  {
    id: "4",
    title: "Legal",
    menus: [
      { href: "/terms-of-service", label: "Terms of Service" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/refund-policy", label: "Refund Policy" },
      { href: "/safety-guidelines", label: "Safety Guidelines" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
    <div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
          <img src={Logo} alt="TaskEase logo" className="w-32 h-auto" />
          </div>
         
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
    </>
  );
};

export default Footer;
