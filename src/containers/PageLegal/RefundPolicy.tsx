import React, { FC } from "react";
import { Helmet } from "react-helmet-async";

export interface PageRefundPolicyProps {
  className?: string;
}

const PageRefundPolicy: FC<PageRefundPolicyProps> = ({ className = "" }) => {
  return (
    <div className={`nc-PageRefundPolicy ${className}`} data-nc-id="PageRefundPolicy">
      <Helmet>
        <title>Refund Policy | TaskEase</title>
      </Helmet>
      
      <div className="container py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Refund Policy
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                1. Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TaskEase is committed to ensuring customer satisfaction with all services booked through 
                our platform. This refund policy outlines the circumstances under which refunds may be 
                issued and the process for requesting them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                2. When Refunds Are Available
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Service Provider Cancellation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    If a service provider cancels a booking, you will receive a full refund of any 
                    payments made, including platform fees.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Poor Service Quality
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    If the service provided does not meet the agreed-upon standards or specifications, 
                    you may be eligible for a partial or full refund after review.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No-Show by Service Provider
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    If a service provider fails to show up for a scheduled appointment without prior 
                    notice, you will receive a full refund.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Platform Errors
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    If technical issues on our platform result in incorrect charges or double billing, 
                    we will issue appropriate refunds.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                3. When Refunds Are Not Available
              </h2>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Services that have been completed satisfactorily</li>
                <li>Late cancellations by customers (less than 24 hours notice)</li>
                <li>Services cancelled due to customer no-show</li>
                <li>Disputes over minor quality issues that don't affect service delivery</li>
                <li>Services where the customer provided incorrect information</li>
                <li>Force majeure events beyond our control</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                4. Refund Process
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Step 1: Contact Support
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Contact our customer support team within 48 hours of the issue occurring. Provide 
                    your booking reference number and detailed explanation of the problem.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Step 2: Investigation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our team will investigate the issue by reviewing booking details, communication 
                    records, and any supporting evidence provided.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Step 3: Resolution
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We will notify you of our decision within 3-5 business days. If approved, refunds 
                    will be processed according to the original payment method.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                5. Refund Timeline
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Credit/Debit Cards:</strong> 5-10 business days</li>
                  <li><strong>Digital Wallets:</strong> 1-3 business days</li>
                  <li><strong>Bank Transfers:</strong> 3-7 business days</li>
                  <li><strong>Platform Credits:</strong> Immediate</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                6. Partial Refunds
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                In some cases, partial refunds may be issued when:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Service was partially completed</li>
                <li>Quality issues affected only certain aspects of the service</li>
                <li>Additional costs were incurred due to customer requirements</li>
                <li>Service provider arrived late but completed the work</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                7. Dispute Resolution
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you disagree with our refund decision, you may:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Request a review by our senior support team</li>
                <li>Provide additional evidence or documentation</li>
                <li>Escalate to our customer relations department</li>
                <li>Seek mediation through appropriate consumer protection agencies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                8. Service Provider Refunds
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Service providers may be eligible for refunds of platform fees in cases of:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Customer no-show without prior notice</li>
                <li>Customer cancellation within 24 hours of service</li>
                <li>Platform technical errors affecting service delivery</li>
                <li>Unsafe or inappropriate working conditions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                9. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For refund requests or questions about this policy, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  Email: refunds@taskease.com<br />
                  Phone: +92-XXX-XXXXXXX<br />
                  Support Hours: Monday-Friday, 9:00 AM - 6:00 PM PKT<br />
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

export default PageRefundPolicy; 