import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";

import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";

export interface PageContactProps {
  className?: string;
}



const PageContact: FC<PageContactProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageContact overflow-hidden ${className}`}
      data-nc-id="PageContact"
    >
      <Helmet>
        <title>TaskEase</title>
      </Helmet>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contact
        </h2>
        <div className="container max-w-7xl- mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <form className="grid grid-cols-1 gap-6" >
                <label className="block">
                  <Label>Full name</Label>

                  <Input
                    placeholder="Example Doe"
                    type="text"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Email address</Label>

                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Message</Label>

                  <Textarea className="mt-1" rows={6} />
                </label>
                <div>
                  <ButtonPrimary type="submit" onClick={() => alert("message sent successfully")}>Send Message</ButtonPrimary>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <div className="container">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="Pagecontact_" />
        </div>
        <SectionSubscribe2 className="py-24 lg:py-32" />
      </div>
    </div>
  );
};

export default PageContact;
