import React, { FC } from "react";
import { Helmet } from "react-helmet-async";

export interface PageSafetyGuidelinesProps {
  className?: string;
}

const PageSafetyGuidelines: FC<PageSafetyGuidelinesProps> = ({ className = "" }) => {
  return (
    <div className={`nc-PageSafetyGuidelines ${className}`} data-nc-id="PageSafetyGuidelines">
      <Helmet>
        <title>Safety Guidelines | TaskEase</title>
      </Helmet>
      
      <div className="container py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Safety Guidelines
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                At TaskEase, your safety is our top priority. These guidelines are designed to ensure 
                a safe and secure experience for both service providers and customers. Please read and 
                follow these guidelines carefully.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                2. For Customers
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Before Booking
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Verify service provider profiles and reviews</li>
                    <li>Check service provider credentials and certifications</li>
                    <li>Read service descriptions and terms carefully</li>
                    <li>Ensure your location is safe and accessible</li>
                    <li>Have someone present during service if possible</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    During Service
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Greet the service provider and verify their identity</li>
                    <li>Provide clear instructions and requirements</li>
                    <li>Maintain appropriate supervision</li>
                    <li>Keep children and pets away from work areas</li>
                    <li>Report any concerns immediately</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    After Service
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Inspect completed work thoroughly</li>
                    <li>Address any issues before payment</li>
                    <li>Provide honest feedback and ratings</li>
                    <li>Report any safety concerns to TaskEase</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                3. For Service Providers
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Personal Safety
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Always carry proper identification</li>
                    <li>Use safe transportation methods</li>
                    <li>Inform someone of your work schedule</li>
                    <li>Trust your instincts - leave if you feel unsafe</li>
                    <li>Keep emergency contacts readily available</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Professional Conduct
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Arrive on time and dress professionally</li>
                    <li>Maintain clear communication with customers</li>
                    <li>Follow safety protocols for your trade</li>
                    <li>Use appropriate safety equipment</li>
                    <li>Respect customer property and privacy</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Work Safety
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Assess work environment for hazards</li>
                    <li>Use proper tools and equipment</li>
                    <li>Follow industry safety standards</li>
                    <li>Maintain clean and organized work areas</li>
                    <li>Report unsafe conditions to customers</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                4. Emergency Procedures
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Medical Emergencies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Call emergency services immediately (112 in Pakistan). Provide clear location 
                    information and describe the situation accurately.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Security Incidents
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Contact local police if you feel threatened or witness criminal activity. 
                    Report incidents to TaskEase support team.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Property Damage
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Document damage with photos and contact TaskEase immediately. Do not attempt 
                    repairs without proper authorization.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                5. COVID-19 Safety
              </h2>
              <div className="space-y-4">
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Wear masks when required by local regulations</li>
                  <li>Maintain social distancing when possible</li>
                  <li>Use hand sanitizer and wash hands frequently</li>
                  <li>Cancel appointments if experiencing symptoms</li>
                  <li>Follow local health guidelines and restrictions</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                6. Service-Specific Safety
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Electrical Work
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Ensure power is disconnected before work begins</li>
                    <li>Use appropriate safety equipment and tools</li>
                    <li>Follow electrical codes and standards</li>
                    <li>Test circuits before restoring power</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Plumbing Work
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Shut off water supply before repairs</li>
                    <li>Use proper tools and protective equipment</li>
                    <li>Check for leaks after completion</li>
                    <li>Dispose of waste materials properly</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Cleaning Services
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use appropriate cleaning products safely</li>
                    <li>Ensure proper ventilation</li>
                    <li>Follow product safety instructions</li>
                    <li>Store chemicals securely</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Moving Services
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use proper lifting techniques</li>
                    <li>Secure items properly in vehicles</li>
                    <li>Ensure safe driving practices</li>
                    <li>Protect fragile items appropriately</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                7. Reporting Safety Issues
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you encounter safety issues or concerns:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Contact TaskEase support immediately</li>
                <li>Provide detailed information about the incident</li>
                <li>Include photos or documentation if possible</li>
                <li>Cooperate with any investigations</li>
                <li>Follow up on resolution of issues</li>
              </ul>
            </section>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSafetyGuidelines; 