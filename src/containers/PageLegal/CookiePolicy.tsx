import React, { FC } from "react";
import { Helmet } from "react-helmet-async";

export interface PageCookiePolicyProps {
  className?: string;
}

const PageCookiePolicy: FC<PageCookiePolicyProps> = ({ className = "" }) => {
  return (
    <div className={`nc-PageCookiePolicy ${className}`} data-nc-id="PageCookiePolicy">
      <Helmet>
        <title>Cookie Policy | TaskEase</title>
      </Helmet>
      
      <div className="container py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Cookie Policy
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                1. What Are Cookies?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences, 
                analyzing how you use our site, and personalizing content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                2. Types of Cookies We Use
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Essential Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    These cookies are necessary for the website to function properly. They enable basic 
                    functions like page navigation, access to secure areas, and form submissions.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Authentication and session management</li>
                    <li>Security features and fraud prevention</li>
                    <li>Load balancing and performance optimization</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Functional Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    These cookies enhance your experience by remembering your preferences and choices.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Language and region preferences</li>
                    <li>Service category preferences</li>
                    <li>User interface customization</li>
                    <li>Form data retention</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Analytics Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Page views and navigation patterns</li>
                    <li>Service search and booking behavior</li>
                    <li>Performance metrics and error tracking</li>
                    <li>User journey analysis</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Marketing Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    These cookies are used to deliver relevant advertisements and track marketing campaign performance.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Ad targeting and personalization</li>
                    <li>Campaign effectiveness measurement</li>
                    <li>Retargeting and remarketing</li>
                    <li>Social media integration</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                3. Third-Party Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may use third-party services that place cookies on your device. These services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>Payment processors for secure transactions</li>
                <li>Social media platforms for sharing features</li>
                <li>Advertising networks for targeted ads</li>
                <li>Customer support tools for assistance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                4. Cookie Duration
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Session Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    These cookies are temporary and are deleted when you close your browser. They are used 
                    for session management and security.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Persistent Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    These cookies remain on your device for a set period or until you delete them. They 
                    remember your preferences and settings.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                5. Managing Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You can control and manage cookies in several ways:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Browser Settings
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Most browsers allow you to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>View and delete existing cookies</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block all cookies</li>
                    <li>Set preferences for different cookie types</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Cookie Consent
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    When you first visit our website, you can choose which types of cookies to accept. 
                    You can change these preferences at any time through our cookie settings.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                6. Impact of Disabling Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                While you can disable cookies, doing so may affect your experience on our website:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>You may need to re-enter information repeatedly</li>
                <li>Some features may not work properly</li>
                <li>Personalization options may be limited</li>
                <li>Security features may be compromised</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                7. Updates to This Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons. We will notify you of any 
                material changes by posting the updated policy on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                8. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  Email: privacy@taskease.com<br />
                  Phone: +92-XXX-XXXXXXX<br />
                  Address: [Your Business Address]
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCookiePolicy; 