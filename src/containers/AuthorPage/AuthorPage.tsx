// import { Tab } from "@headlessui/react";
// import CarCard from "components/CarCard/CarCard";
// import CommentListing from "components/CommentListing/CommentListing";
// import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
// import StartRating from "components/StartRating/StartRating";
// import StayCard from "components/StayCard/StayCard";
// import {
//   DEMO_CAR_LISTINGS,
//   DEMO_EXPERIENCES_LISTINGS,
//   DEMO_STAY_LISTINGS,
// } from "data/listings";
// import React, { FC, Fragment, useState } from "react";
// import Avatar from "shared/Avatar/Avatar";
// import ButtonSecondary from "shared/Button/ButtonSecondary";
// import Header3 from "components/Header/Header3";
// import { Helmet } from "react-helmet-async";
// import { getUserProfile } from "@/api/user"; 

// export interface AuthorPageProps {
//   className?: string;
// }


// interface UserProfile {
//   full_name: string;
//   email: string;
//   city: string;
//   joined_date: string;
//   language: string;
//   bio: string;
//   profile_picture?: string;
// }

// const AuthorPage: FC<AuthorPageProps> = ({ className = "" }) => {
//   const [user, setUser] = useState<UserProfile | null>(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const profile = await getUserProfile();
//         setUser(profile);
//       } catch (error) {
//         console.error("Failed to load user profile:", error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

// const AuthorPage: FC<AuthorPageProps> = ({ className = "" }) => {
//   let [categories] = useState(["Stays", "Experiences", "Car for rent"]);

//   const renderSidebar = () => {
//     return (
//       <div className="...">
//         <Avatar
//           hasChecked
//           hasCheckedClass="w-6 h-6 -top-0.5 right-2"
//           sizeClass="w-28 h-28"
//           imgUrl={user?.profile_picture}
//         />
//         <div className="space-y-3 text-center flex flex-col items-center">
//           <h2 className="text-3xl font-semibold">
//             {user?.full_name || "Loading..."}
//           </h2>
//           <StartRating className="!text-base" />
//         </div>
  
//         <p className="text-neutral-500 dark:text-neutral-400">
//           {user?.bio || "No bio available."}
//         </p>
  
//         <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>
  
//         <div className="space-y-4">
//           <div className="flex items-center space-x-4">
//             {/* Location */}
//             <svg className="..." ... />
//             <span>{user?.city || "Location not set"}</span>
//           </div>
  
//           <div className="flex items-center space-x-4">
//             {/* Language */}
//             <svg className="..." ... />
//             <span>{user?.language || "Not specified"}</span>
//           </div>
  
//           <div className="flex items-center space-x-4">
//             {/* Joined Date */}
//             <svg className="..." ... />
//             <span>
//               Joined in {user?.joined_date || "unknown date"}
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   };
  

//   const renderSection1 = () => {
//     return (
//       <div className="listingSection__wrap">
//         <div>
//           <h2 className="text-2xl font-semibold">Kevin Francis's listings</h2>
//           <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
//             Kevin Francis's listings is very rich, 5 star reviews help him to be
//             more branded.
//           </span>
//         </div>
//         <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

//         <div>
//           <Tab.Group>
//             <Tab.List className="flex space-x-1 overflow-x-auto">
//               {categories.map((item) => (
//                 <Tab key={item} as={Fragment}>
//                   {({ selected }) => (
//                     <button
//                       className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
//                         selected
//                           ? "bg-secondary-900 text-secondary-50 "
//                           : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
//                       } `}
//                     >
//                       {item}
//                     </button>
//                   )}
//                 </Tab>
//               ))}
//             </Tab.List>
//             <Tab.Panels>
//               <Tab.Panel className="">
//                 <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
//                   {DEMO_STAY_LISTINGS.filter((_, i) => i < 4).map((stay) => (
//                     <StayCard key={stay.id} data={stay} />
//                   ))}
//                 </div>
//                 <div className="flex mt-11 justify-center items-center">
//                   <ButtonSecondary>Show me more</ButtonSecondary>
//                 </div>
//               </Tab.Panel>
//               <Tab.Panel className="">
//                 <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
//                   {DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 4).map(
//                     (stay) => (
//                       <ExperiencesCard key={stay.id} data={stay} />
//                     )
//                   )}
//                 </div>
//                 <div className="flex mt-11 justify-center items-center">
//                   <ButtonSecondary>Show me more</ButtonSecondary>
//                 </div>
//               </Tab.Panel>
//               <Tab.Panel className="">
//                 <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
//                   {DEMO_CAR_LISTINGS.filter((_, i) => i < 4).map((stay) => (
//                     <CarCard key={stay.id} data={stay} />
//                   ))}
//                 </div>
//                 <div className="flex mt-11 justify-center items-center">
//                   <ButtonSecondary>Show me more</ButtonSecondary>
//                 </div>
//               </Tab.Panel>
//             </Tab.Panels>
//           </Tab.Group>
//         </div>
//       </div>
//     );
//   };

//   const renderSection2 = () => {
//     return (
//       <div className="listingSection__wrap">
//         {/* HEADING */}
//         <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
//         <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

//         {/* comment */}
//         <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
//           <CommentListing hasListingTitle className="pb-8" />
//           <CommentListing hasListingTitle className="py-8" />
//           <CommentListing hasListingTitle className="py-8" />
//           <CommentListing hasListingTitle className="py-8" />
//           <div className="pt-8">
//             <ButtonSecondary>View more 20 reviews</ButtonSecondary>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//     <Header3/>
//     <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
//       <Helmet>
//         <title>Login || Booking React Template</title>
//       </Helmet>
//       <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
//         <div className="block flex-grow mb-24 lg:mb-0">
//           <div className="lg:sticky lg:top-24">{renderSidebar()}</div>
//         </div>
//         <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
//           {renderSection1()}
//           {renderSection2()}
//         </div>
//       </main>
//     </div>
//     </>
//   );
// };

// export default AuthorPage;
import React, { FC, Fragment, useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import CarCard from "components/CarCard/CarCard";
import CommentListing from "components/CommentListing/CommentListing";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import StartRating from "components/StartRating/StartRating";
import StayCard from "components/StayCard/StayCard";
import {
  DEMO_CAR_LISTINGS,
  DEMO_EXPERIENCES_LISTINGS,
  DEMO_STAY_LISTINGS,
} from "data/listings";
import Avatar from "shared/Avatar/Avatar";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Header3 from "components/Header/Header3";
import { Helmet } from "react-helmet-async";
import { getUserProfile } from "api/user"; // ✅ Ensure this import path is correct
//import { UserProfile } from "types"; // ✅ Type for user, adjust path as needed

export interface AuthorPageProps {
  className?: string;
}




interface UserProfile {
  full_name: string;
  email: string;
  city: string;
  joined_date: string;
  language: string;
  bio: string;
  profile_picture?: string;
}

const AuthorPage: FC<AuthorPageProps> = ({ className = "" }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [categories] = useState(["Stays", "Experiences", "Car for rent"]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
        <Avatar
          hasChecked
          hasCheckedClass="w-6 h-6 -top-0.5 right-2"
          sizeClass="w-28 h-28"
          imgUrl={user?.profile_picture}
        />
        <div className="space-y-3 text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold">
            {user?.full_name || "Loading..."}
          </h2>
          <StartRating className="!text-base" />
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">
          {user?.bio || "No bio available."}
        </p>
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <svg className="h-6 w-6 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 12l2-2 7-7 7 7 2 2v10a1 1 0 01-1 1h-3v-4a1 1 0 00-1-1h-2a1 1 0 00-1 1v4H6a1 1 0 01-1-1V12z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{user?.city || "Location not set"}</span>
          </div>
          <div className="flex items-center space-x-4">
            <svg className="h-6 w-6 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{user?.language || "Not specified"}</span>
          </div>
          <div className="flex items-center space-x-4">
            <svg className="h-6 w-6 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Joined in {user?.joined_date || "unknown date"}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection1 = () => (
    <div className="listingSection__wrap">
      <div>
        <h2 className="text-2xl font-semibold">{user?.full_name}'s listings</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          5-star reviews help {user?.full_name} become more branded.
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 overflow-x-auto">
          {categories.map((item) => (
            <Tab key={item} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                    selected
                      ? "bg-secondary-900 text-secondary-50"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  {item}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
              {DEMO_STAY_LISTINGS.slice(0, 4).map((stay) => (
                <StayCard key={stay.id} data={stay} />
              ))}
            </div>
            <div className="flex mt-11 justify-center items-center">
              <ButtonSecondary>Show me more</ButtonSecondary>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
              {DEMO_EXPERIENCES_LISTINGS.slice(0, 4).map((exp) => (
                <ExperiencesCard key={exp.id} data={exp} />
              ))}
            </div>
            <div className="flex mt-11 justify-center items-center">
              <ButtonSecondary>Show me more</ButtonSecondary>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
              {DEMO_CAR_LISTINGS.slice(0, 4).map((car) => (
                <CarCard key={car.id} data={car} />
              ))}
            </div>
            <div className="flex mt-11 justify-center items-center">
              <ButtonSecondary>Show me more</ButtonSecondary>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );

  const renderSection2 = () => (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {[...Array(4)].map((_, i) => (
          <CommentListing key={i} hasListingTitle className={i === 0 ? "pb-8" : "py-8"} />
        ))}
        <div className="pt-8">
          <ButtonSecondary>View more 20 reviews</ButtonSecondary>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header3 />
      <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
        <Helmet>
          <title>Author Page || Booking React Template</title>
        </Helmet>
        <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
          <div className="block flex-grow mb-24 lg:mb-0">
            <div className="lg:sticky lg:top-24">{renderSidebar()}</div>
          </div>
          <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
            {renderSection1()}
            {renderSection2()}
          </div>
        </main>
      </div>
    </>
  );
};

export default AuthorPage;
