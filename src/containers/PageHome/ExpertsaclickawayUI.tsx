import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import React from "react";
import appSvg1 from "images/appSvg1.png";
import appSvg2 from "images/appSvg2.png";
import appRightImgTree from "images/appRightImgTree.png";
import dowloadAppBGPng from "images/dowloadAppBG.png";
import appRightImg from "images/appRightImg.png";
import btnIosPng from "images/btn-ios.png";
import btnAndroidPng from "images/btn-android.png";
const SectionDowloadApp = () => {
  return (
    <div className="relative pb-0 pt-24 lg:py-32 xl:py-40 2xl:py-48">
      <BackgroundSection className="bg-neutral-100 bg-opacity-80 dark:bg-opacity-100 ">
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-3xl object-right"
          src={dowloadAppBGPng}
          alt="dowloadAppPng"
        />

        <div className="hidden lg:block absolute right-0 bottom-0 max-w-xl xl:max-w-2xl rounded-3xl overflow-hidden">
          <img src={appRightImg} alt="" />
        </div>
        <div className="absolute right-0 top-0 max-w-2xl">
          <img src={appRightImgTree} alt="" />
        </div>
        <div className="absolute left-0 bottom-10 max-w-2xl">
          <img src={appSvg1} alt="" />
        </div>
      </BackgroundSection>

      <div className="relative inline-block ">
        <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold text-neutral-800">
          A Click Away  
        </h2>
        <span className="block mt-7 max-w-md text-neutral-6000">
         Get Experts From The Comfort Of Your House 
        </span>
          

        <img
          className="hidden lg:block absolute lg:left-full lg:top-0 xl:top-1/2 z-10  lg:max-w-sm 2xl:max-w-none"
          src={appSvg2}
          alt=""
        />

        <div className="block lg:hidden mt-10 max-w-2xl rounded-3xl overflow-hidden">
          <img src={appRightImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SectionDowloadApp;
