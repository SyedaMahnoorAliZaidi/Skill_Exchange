import React, { FC } from "react";
import { Helmet } from "react-helmet-async";

export interface PageTermsOfServiceProps {
  className?: string;
}

const PageTermsOfService: FC<PageTermsOfServiceProps> = ({ className = "" }) => {
  return (
    <div className={`nc-PageTermsOfService ${className}`} data-nc-id="PageTermsOfService">
      <Helmet>
        <title>Terms of Service | TaskEase</title>
      </Helmet>
      
      <div className="container py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By accessing and using TaskEase, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TaskEase is a platform that connects service providers (experts) with customers seeking various services 
                including but not limited to stitching, plumbing, electrical work, carpentry, cleaning, gardening, 
                painting, moving, repair, and installation services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                3. User Responsibilities
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    For Service Providers (Experts):
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Provide accurate and truthful information about your services</li>
                    <li>Maintain professional standards and quality of work</li>
                    <li>Complete services as agreed upon with customers</li>
                    <li>Maintain appropriate insurance and licenses</li>
                    <li>Respect customer privacy and property</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    For Customers:
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Provide accurate information about your service needs</li>
                    <li>Pay for services as agreed upon</li>
                    <li>Treat service providers with respect</li>
                    <li>Provide safe working conditions</li>
                    <li>Report any issues promptly</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                4. Payment Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                All payments are processed through our secure payment system. Service providers will receive payment 
                after successful completion of services, minus any applicable platform fees. Customers agree to pay 
                the agreed-upon amount for services rendered.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                5. Cancellation Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cancellations must be made at least 24 hours before the scheduled service time. Late cancellations 
                may result in charges as determined by the service provider. TaskEase reserves the right to charge 
                cancellation fees in accordance with our cancellation policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                6. Dispute Resolution
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                In case of disputes between service providers and customers, TaskEase will act as a mediator. 
                We encourage open communication to resolve issues. If mediation is unsuccessful, disputes may 
                be resolved through appropriate legal channels.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TaskEase acts as a platform connecting service providers and customers. We are not responsible 
                for the quality of services provided or any damages that may occur during service provision. 
                Service providers are responsible for their own work and should maintain appropriate insurance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                8. Privacy and Data Protection
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We are committed to protecting your privacy. Please review our Privacy Policy to understand 
                how we collect, use, and protect your personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                9. Modifications to Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TaskEase reserves the right to modify these terms at any time. Users will be notified of 
                significant changes. Continued use of the platform after changes constitutes acceptance of 
                the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                10. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  Email: support@taskease.com<br />
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

export default PageTermsOfService; 