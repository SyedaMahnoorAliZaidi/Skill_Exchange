import { ComponentType } from "react";

export interface LocationStates {
  "/": {};
  
  "/adminHomepage": {};
  "/delete-service": {};
  "/home-2": {};
  "/home-3": {};
  "/home-1-header-2": {};
  //
  "/listing-flights"?: {};
  //
  "/listing-stay"?: {};
  "/listing-stay-map"?: {};
  "/listing-stay-detail"?: {};
  //
  "/listing-experiences"?: {};
  "/listing-experiences-map"?: {};
  "/listing-experiences-detail"?: {};
  //
  "/listing-real-estate"?: {};
  "/listing-real-estate-map"?: {};
  "/listing-real-estate-detail"?: {};
  //
  "/listing-car"?: {};
  "/listing-car-map"?: {};
  "/listing-car-detail"?: {};
  //
  "/checkout"?: {};
  "/pay-done"?: {};
  //
  "/account"?: {};
  "/account-savelists"?: {};
  "/account-password"?: {};
  "/account-billing"?: {};
  //
  "/blog"?: {};
  "/blog-single"?: {};
  //
  "/add-listing-1"?: {};
  "/add-listing-2"?: {};
  "/add-listing-3"?: {};
  "/add-listing-5"?: {};
  "/add-listing-6"?: {};
  "/add-listing-7"?: {};
  "/add-listing-8"?: {};
  "/add-listing-9"?: {};
  "/add-listing-10"?: {};
  //
  "/author"?: {};
  "/search"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/subscription"?: {};
  "/booking"?: {};
  "/admin-bookings"?: {};
  "/customer-bookings"?: {};
  "/expert-service-detail"?: {};
  "/service-detail"?: {};
  "/customer-service-detail"?: {};
  "/stitching"?: {};
  "/plumbing"?: {};
  "/electrical"?: {};
  "/carpentry"?: {};
  "/cleaning"?: {};
  "/gardening"?: {};
  "/painting"?: {};
  "/moving"?: {};
  "/repair"?: {};
  "/installation"?: {};
  "/maintenance"?: {};
  "/customer-home"?: {};
  "/terms-of-service"?: {};
  "/privacy-policy"?: {};
  "/cookie-policy"?: {};
  "/refund-policy"?: {};
  "/safety-guidelines"?: {};
  "/customer-faq"?: {};
  "/expert-faq"?: {};
  "/expert-account"?: {};
  "/expert-stitching"?: {};
  "/expert-electrical"?: {};
  "/expert-plumbing"?: {};
  "/expert-painting"?: {};
  "/expert-maintenance"?: {};
  "/expert-gardening"?: {};
  "/expert-carpentry"?: {};
  "/expert-repair"?: {};
  "/expert-moving"?: {};
  "/expert-installation"?: {};
  "/expert-cleaning"?: {};
  "/admin-account-savelists"?: {};
  "/admin-account-billing"?: {};
  "/admin-account-pass"?: {};
  "/admin-common-layout"?: {};
  "/expert-about"?: {};
  "/admin-nav-mobile"?: {};
  "/expert-aboutus"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
