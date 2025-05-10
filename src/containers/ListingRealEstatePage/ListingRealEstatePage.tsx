import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { TaxonomyType } from "data/types";
import React, { FC, useEffect } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet-async";
import SectionHero2ArchivePage from "components/SectionHero2ArchivePage/SectionHero2ArchivePage";

export interface ListingRealEstatePageProps {
  className?: string;
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "#",
    name: "Enjoy stiched clothes ",
    taxonomy: "category",
    count: 17288,
    thumbnail:
      "https://as2.ftcdn.net/v2/jpg/02/11/69/69/1000_F_211696928_AjMQAlGNsMTSojXHa4UhFypNbZPeQowR.jpg",
    listingType: "experiences",
  },
  {
    id: "2",
    href: "#",
    name: "Fix electric chaos ",
    taxonomy: "category",
    count: 2118,
    thumbnail:
      "https://as2.ftcdn.net/jpg/03/27/68/13/1000_F_327681318_zj9nmmzeOkbqx85ALP7Z2mjI58erARK0.webp ",
    listingType: "experiences",
  },
  {
    id: "3",
    href: "#",
    name: "Stop the dripping ",
    taxonomy: "category",
    count: 36612,
    thumbnail:
      "https://as1.ftcdn.net/v2/jpg/03/29/58/14/1000_F_329581450_931iXKUlekGxzv2rsDgRdlucndykJhkI.jpg",
    listingType: "experiences",
  },
  {
    id: "5",
    href: "#",
    name: "Enjoy house help ",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://as2.ftcdn.net/v2/jpg/02/63/80/61/1000_F_263806150_HatBKt7BhHxkYwberJ9rwDF8ay5mzbH6.jpg",
    listingType: "experiences",
  },
  {
    id: "4",
    href: "#",
    name: "Enjoy the Beauty of Seoul",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    listingType: "experiences",
  },
];

const ListingRealEstatePage: FC<ListingRealEstatePageProps> = ({
  className = "",
}) => {
  useEffect(() => {
    const $body = document.querySelector("body");
    if ($body) {
      $body.className = "theme-cyan-blueGrey";
    }
    return () => {
      if ($body) {
        $body.className = "";
      }
    };
  }, []);

  return (
    <div
      className={`nc-ListingRealEstatePage relative overflow-hidden ${className}`}
      data-nc-id="ListingRealEstatePage"
    >
      <Helmet>
        <title>TaskEase</title>
      </Helmet>

      <div className="container relative">
        {/* SECTION HERO */}
        <SectionHero2ArchivePage className="" />

        {/* SECTION */}
        <SectionGridFilterCard className="py-24 lg:py-28" />

        {/* SECTION 1 */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore top services "
            subHeading="Explore thousands of services around the you"
            categoryCardType="card4"
            itemPerRow={4}
            categories={DEMO_CATS}
            sliderStyle="style2"
            uniqueClassName="nc-ListingRealEstatePage"
          />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-28" />
      </div>
    </div>
  );
};

export default ListingRealEstatePage;
