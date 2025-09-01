import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import Booking from "containers/ExpertPages/Booking";
import Page404 from "containers/Page404/Page404";
import ListingStayPage from "containers/ListingStayPage/ListingStayPage";
import ListingStayMapPage from "containers/ListingStayPage/ListingStayMapPage";
import ListingExperiencesPage from "containers/ListingExperiencesPage/ListingExperiencesPage";
import ListingExperiencesMapPage from "containers/ListingExperiencesPage/ListingExperiencesMapPage";
import ListingCarPage from "containers/ListingCarPage/ListingCarPage";
import ListingCarMapPage from "containers/ListingCarPage/ListingCarMapPage";
import CheckOutPage from "containers/CheckOutPage/CheckOutPage";
import PayPage from "containers/PayPage/PayPage";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPage from "containers/AccountPage/AccountPage";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountSavelists from "containers/AccountPage/AccountSavelists";
import AccountBilling from "containers/AccountPage/AccountBilling";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import PageAddListing1 from "containers/PageAddListing1/PageAddListing1";
import PageAddListing2 from "containers/PageAddListing1/PageAddListing2";
import PageAddListing3 from "containers/PageAddListing1/PageAddListing3";
import PageAddListing5 from "containers/PageAddListing1/PageAddListing5";
import PageAddListing6 from "containers/PageAddListing1/PageAddListing6";
import PageAddListing7 from "containers/PageAddListing1/PageAddListing7";
import PageAddListing8 from "containers/PageAddListing1/PageAddListing8";
import PageAddListing9 from "containers/PageAddListing1/PageAddListing9";
import PageAddListing10 from "containers/PageAddListing1/PageAddListing10";
import PageHome2 from "containers/LandingPage/landingpage";
import ListingRealEstateMapPage from "containers/ListingRealEstatePage/ListingRealEstateMapPage";
import ListingRealEstatePage from "containers/ListingRealEstatePage/ListingRealEstatePage";
import SiteHeader from "containers/SiteHeader";
import ListingFlightsPage from "containers/ListingFlightsPage/ListingFlightsPage";
import FooterNav from "components/FooterNav";
import useWindowSize from "hooks/useWindowResize";
import Header3 from "components/Header/Header3";
import LandingPageHeader from "components/LandingPageHeader/landingPageHeader"
import ListingStayDetailPage from "containers/ListingDetailPage/listing-stay-detail/ListingStayDetailPage";
import ListingCarDetailPage from "containers/ListingDetailPage/listing-car-detail/ListingCarDetailPage";
import ListingExperiencesDetailPage from "containers/ListingDetailPage/listing-experiences-detail/ListingExperiencesDetailPage";
import ExpertHomepage from "containers/ExpertPages/Homepage";
import DeleteService from "containers/ExpertPages/DeleteService";
import ExpertServiceDetail from"containers/ExpertPages/ExpertServiceDetail";
import Stitching from "containers/CommonPages/Stitching";
import Plumbing from "containers/CommonPages/Plumbing";
import Electrical from "containers/CommonPages/Electrical";
import Carpentry from "containers/CommonPages/Carpentry";
import Cleaning from "containers/CommonPages/Cleaning";
import Gardening from "containers/CommonPages/Gardening";
import Painting from "containers/CommonPages/Painting";
import Moving from "containers/CommonPages/Moving";
import Repair from "containers/CommonPages/Repair";
import Installation from "containers/CommonPages/Installation";
import Maintenance from "containers/CommonPages/Maintenance";
import LandingPageServiceDetail from "containers/LandingPage/landingPageServiceDetail";
import CustomerHomePage from "containers/CustomerPages/CustomerHomePage";
import PageTermsOfService from "containers/PageLegal/TermsOfService";
import PagePrivacyPolicy from "containers/PageLegal/PrivacyPolicy";
import PageCookiePolicy from "containers/PageLegal/CookiePolicy";
import PageRefundPolicy from "containers/PageLegal/RefundPolicy";
import PageSafetyGuidelines from "containers/PageLegal/SafetyGuidelines";
import ServiceDeetailCustomer from "containers/CustomerPages/ServiceDeetailCustomer";
import CustomerBookings from "containers/CustomerPages/CustomerBookings";
import AdminBookings from "containers/ExpertPages/AdminBookings";
import { CustomerFAQ } from "containers/CustomerPages";
import { ExpertFAQ } from "containers/ExpertPages";
import ExpertAccountPage from "containers/ExpertAccountPage/ExpertAccountPage";
import ExpertStitching from "containers/ExpertCommonpages/Stitching";
import ExpertElectrical from "containers/ExpertCommonpages/Electrical";
import ExpertPlumbing from "containers/ExpertCommonpages/Plumbing";
import ExpertPainting from "containers/ExpertCommonpages/Painting";
import ExpertMaintenance from "containers/ExpertCommonpages/Maintenance";
import ExpertGardening from "containers/ExpertCommonpages/Gardening";
import ExpertCarpentry from "containers/ExpertCommonpages/Carpentry";
import ExpertRepair from "containers/ExpertCommonpages/Repair";
import ExpertMoving from "containers/ExpertCommonpages/Moving";
import ExpertInstallation from "containers/ExpertCommonpages/Installation";
import ExpertCleaning from "containers/ExpertCommonpages/Cleaning";
import AdminAccountSavelists from "containers/ExpertAccountPage/AccountSavelists";
import AdminAccountBilling from "containers/ExpertAccountPage/AccountBilling";
import AdminAccountPass from "containers/ExpertAccountPage/AccountPass";
import AdminCommonLayout from "containers/ExpertAccountPage/CommonLayout";
import AdminNavMobile from "components/Header/AdminNavMobile";
import ExpertPageabout from "containers/PageAbout/ExpertPageabout";

export const pages: Page[] = [
  { path: "/", component: SiteHeader },
  { path: "/customer-home", component: CustomerHomePage },
  { path: "/adminHomepage", component: ExpertHomepage },
  { path: "/delete-service", component: DeleteService },
  { path: "/home-2", component: PageHome2 },
 // { path: "/listing-stay", component: ListingStayPage },
  { path: "/listing-stay-map", component: ListingStayMapPage },
  { path: "/listing-stay-detail", component: ListingStayDetailPage },
 // { path: "/listing-experiences", component: ListingExperiencesPage },
  { path: "/listing-experiences-map", component: ListingExperiencesMapPage },
  { path: "/listing-experiences-detail", component: ListingExperiencesDetailPage },
  { path: "/listing-car", component: ListingCarPage },
  { path: "/listing-car-map", component: ListingCarMapPage },
  { path:"/expert-service-detail", component:ExpertServiceDetail},
  { path: "/service-detail", component:LandingPageServiceDetail},
  { path: "/customer-service-detail", component:ServiceDeetailCustomer},
 // { path: "/listing-car-detail", component: ListingCarDetailPage },
  { path: "/listing-real-estate-map", component: ListingRealEstateMapPage },
  //{ path: "/listing-real-estate", component: ListingRealEstatePage },
  // { path: "/listing-flights", component: ListingFlightsPage },
  { path: "/checkout", component: CheckOutPage },
  { path: "/pay-done", component: PayPage },
  { path: "/author", component: AuthorPage },
  { path: "/account", component: AccountPage },
  { path: "/account-password", component: AccountPass },
  { path: "/account-billing", component: AccountBilling },
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },


  
  { path: "/add-listing-1", component: PageAddListing1 },
  { path: "/add-listing-2", component: PageAddListing2 },
  { path: "/add-listing-3", component: PageAddListing3 },
  { path: "/add-listing-5", component: PageAddListing5 },
  { path: "/add-listing-6", component: PageAddListing6 },
  { path: "/add-listing-7", component: PageAddListing7 },
  { path: "/add-listing-8", component: PageAddListing8 },
  { path: "/add-listing-9", component: PageAddListing9 },
  { path: "/add-listing-10", component: PageAddListing10 },
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },
  { path: "/signup", component: PageSignUp },
  { path: "/login", component: PageLogin },
  { path: "/booking", component: Booking },
  { path: "/admin-bookings", component: AdminBookings },
  { path: "/customer-bookings", component: CustomerBookings },
  { path: "/subscription", component: PageSubcription },
  { path: "/customer-faq", component: CustomerFAQ },
  { path: "/expert-faq", component: ExpertFAQ },
  { path: "/expert-account", component: ExpertAccountPage },
  { path: "/admin-account-savelists", component: AdminAccountSavelists },
  { path: "/admin-account-billing", component: AdminAccountBilling },
  { path: "/admin-account-pass", component: AdminAccountPass },
  { path: "/admin-common-layout", component: AdminCommonLayout },
  { path: "/admin-nav-mobile", component: AdminNavMobile },
  { path: "/expert-aboutus", component: ExpertPageabout },


  { path: "/stitching", component: Stitching },
  { path: "/plumbing", component: Plumbing },
  { path: "/electrical", component: Electrical },
  { path: "/carpentry", component: Carpentry },
  { path: "/cleaning", component: Cleaning },
  { path: "/gardening", component: Gardening },
  { path: "/painting", component: Painting },
  { path: "/moving", component: Moving },
  { path: "/repair", component: Repair },
  { path: "/installation", component: Installation },
  { path: "/maintenance", component: Maintenance },
  { path: "/terms-of-service", component: PageTermsOfService },
  { path: "/privacy-policy", component: PagePrivacyPolicy },
  { path: "/cookie-policy", component: PageCookiePolicy },
  { path: "/refund-policy", component: PageRefundPolicy },
  { path: "/safety-guidelines", component: PageSafetyGuidelines },
  { path: "/expert-stitching", component: ExpertStitching },
  { path: "/expert-electrical", component: ExpertElectrical },
  { path: "/expert-plumbing", component: ExpertPlumbing },
  { path: "/expert-painting", component: ExpertPainting },
  { path: "/expert-maintenance", component: ExpertMaintenance },
  { path: "/expert-gardening", component: ExpertGardening },
  { path: "/expert-carpentry", component: ExpertCarpentry },
  { path: "/expert-repair", component: ExpertRepair },
  { path: "/expert-moving", component: ExpertMoving },
  { path: "/expert-installation", component: ExpertInstallation },
  { path: "/expert-cleaning", component: ExpertCleaning },
];

const MyRoutes = () => {
  let WIN_WIDTH = useWindowSize().width;
  if (typeof window !== "undefined") {
    WIN_WIDTH = WIN_WIDTH || window.innerWidth;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {pages.map(({ component, path }) => {
          const Component = component;

          // Conditionally render Header3
          return (
            <Route
              key={path}
              path={path}
              element={
                <>
                  <Component />   
                </>
              }
            />
          );
        })}
        <Route path="*" element={<Page404 />} />
      </Routes>
      {WIN_WIDTH < 768 && <FooterNav />}
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default MyRoutes;
//{path !== "/signup" && path !== "/login" && <Header3 />}

