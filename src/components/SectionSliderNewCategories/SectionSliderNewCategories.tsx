import React, { FC, useEffect, useMemo } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import { TaxonomyType } from "data/types";
import CardCategory3 from "components/CardCategory3/CardCategory3";
import CardCategory4 from "components/CardCategory4/CardCategory4";
import NextPrev from "shared/NextPrev/NextPrev";
import CardCategory5 from "components/CardCategory5/CardCategory5";
import useNcId from "hooks/useNcId";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: TaxonomyType[];
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
  uniqueClassName: string;
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "TV Mounting",
    taxonomy: "category",
    count: 35,
    thumbnail:
      "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Light Fixture Setup",
    taxonomy: "category",
    count: 28,
    thumbnail:
      "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg?auto=compress&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "Curtain Rod Fixing",
    taxonomy: "category",
    count: 22,
    thumbnail:
      "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "Fan Installation",
    taxonomy: "category",
    count: 18,
    thumbnail:
      "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&fit=crop&w=400&q=80",
  },
  {
    id: "5",
    href: "/listing-stay",
    name: "Wi-Fi Router Setup",
    taxonomy: "category",
    count: 15,
    thumbnail:
      "https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg?auto=compress&fit=crop&w=400&q=80",
  },
];

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = "Specialized Home Installations",
  subHeading = "Discover more installation and setup services for your home.",
  className = "",
  itemClassName = "",
  categories = DEMO_CATS,
  itemPerRow = 5,
  categoryCardType = "card3",
  sliderStyle = "style1",
  uniqueClassName,
}) => {
  const UNIQUE_CLASS =
    "SectionSliderNewCategories__" + uniqueClassName + useNcId();

  let MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      perView: itemPerRow,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: itemPerRow - 1,
        },
        1024: {
          gap: 20,
          perView: itemPerRow - 1,
        },
        768: {
          gap: 20,
          perView: itemPerRow - 2,
        },
        640: {
          gap: 20,
          perView: itemPerRow - 3,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    });
  }, [UNIQUE_CLASS]);

  useEffect(() => {
    setTimeout(() => {
      MY_GLIDEJS.mount();
    }, 100);
  }, [MY_GLIDEJS, UNIQUE_CLASS]);

  const renderCard = (item: TaxonomyType, index: number) => {
    switch (categoryCardType) {
      case "card3":
        return <CardCategory3 taxonomy={item} />;
      case "card4":
        return <CardCategory4 taxonomy={item} />;
      case "card5":
        return <CardCategory5 taxonomy={item} />;
      default:
        return <CardCategory3 taxonomy={item} />;
    }
  };

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`}>
        <Heading
          desc={subHeading}
          hasNextPrev={sliderStyle === "style1"}
          isCenter={sliderStyle === "style2"}
        >
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {categories.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                {renderCard(item, index)}
              </li>
            ))}
          </ul>
        </div>

        {sliderStyle === "style2" && (
          <NextPrev className="justify-center mt-16" />
        )}
      </div>
    </div>
  );
};

export default SectionSliderNewCategories;
