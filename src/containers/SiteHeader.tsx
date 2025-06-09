import React, { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header3 from "components/Header/Header3";
import { PathName } from "routers/types";
import PageHome2 from "containers/PageHome/PageHome2";
import LandingPageHeader from "components/LandingPageHeader/landingPageHeader"

const SiteHeader = () => {
  const renderHeader = () => {
    return <Header3 />; // Always show Header 3
  };

  return (
    <>
      <Helmet>
        <title>TaskEase</title>
      </Helmet>
      <LandingPageHeader/>
      <PageHome2/>
      {/* Directly display the Real Estate content for '/home-2' */}
      <div className="real-estate-content">
        
        {/* You can replace this with actual content for the Real Estate page */}
      </div>
    </>
  );
};

export default SiteHeader;
