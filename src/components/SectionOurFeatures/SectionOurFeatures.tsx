import React, { FC } from "react";
import rightImgPng from "images/our-features.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: string;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          BENnefits
        </span>
        <h2 className="font-semibold text-4xl mt-5">HAPPENING NEEDS </h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Advertising" />
            <span className="block text-xl font-semibold">
              Easy and Convenient
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
             Save time and money by finding the right service provider for your needs.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Exposure " />
            <span className="block text-xl font-semibold">
              Reach millions with TaskEase
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
            Connect with a wide range of service providers in your area.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Secure" />
            <span className="block text-xl font-semibold">
              Secure and simple
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Quality service providers at your fingertips.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
