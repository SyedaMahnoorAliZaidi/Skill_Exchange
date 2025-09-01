// context/ListingFormContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { submitListing as apiSubmitListing } from '../api/listing';

// Define the complete listing data interface
export interface ListingFormData {
  // Page 1: Service Category
  selectedService: string;
  specificServices: string[];
  
  // Page 2: Location
  city: string;
  latitude: number;
  longitude: number;
  
  // Page 3: Skill/Expertise
  expertiseLevel: string;
  yearsOfExperience: number;
  
  // Page 5: Service Attributes
  clientPresent: string;
  useTools: string;
  trialSession: string;
  lateArrival: string;
  sameDayCancel: string;
  rescheduling: string;
  partialPayment: string;
  inspection: string;
  
  // Page 6: Description
  description: string;
  
  // Page 7: Images
  coverImage: File | null;
  workImages: File[];
  
  // Page 8: Pricing
  currency: string;
  hourlyRate: number;
  weekendRate: number;
  bulkDiscount: number;
  
  // Page 9: Time Slots
  timeSlots: string[];
  
  // Page 10: Review (no additional data, just review)
}

// Initial state
const initialListingData: ListingFormData = {
  selectedService: '',
  specificServices: [],
  city: '',
  latitude: 31.5204,
  longitude: 74.3587,
  expertiseLevel: '',
  yearsOfExperience: 1,
  clientPresent: 'Allow',
  useTools: 'Allow',
  trialSession: 'Allow',
  lateArrival: 'Allow',
  sameDayCancel: 'DoNotAllow',
  rescheduling: 'Allow',
  partialPayment: 'Charge',
  inspection: 'Allow',
  description: '',
  coverImage: null,
  workImages: [],
  currency: 'PKR',
  hourlyRate: 0,
  weekendRate: 0,
  bulkDiscount: 0,
  timeSlots: [],
};

// Context interface
interface ListingFormContextType {
  listingData: ListingFormData;
  setListingData: React.Dispatch<React.SetStateAction<ListingFormData>>;
  updateListingData: (updates: Partial<ListingFormData>) => void;
  resetListingData: () => void;
  submitListing: () => Promise<void>;
  isSubmitting: boolean;
  submitError: string | null;
}

// Create context
const ListingFormContext = createContext<ListingFormContextType | undefined>(undefined);

// Provider component
interface ListingFormProviderProps {
  children: ReactNode;
}

export const ListingFormProvider: React.FC<ListingFormProviderProps> = ({ children }) => {
  const [listingData, setListingData] = useState<ListingFormData>(initialListingData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Update specific fields
  const updateListingData = (updates: Partial<ListingFormData>) => {
    setListingData(prev => ({ ...prev, ...updates }));
  };

  // Reset all data
  const resetListingData = () => {
    setListingData(initialListingData);
    setSubmitError(null);
  };

  // Submit listing to API
  const submitListing = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await apiSubmitListing(listingData);
      console.log('Listing submitted successfully:', result);
      
      // Reset form after successful submission
      resetListingData();
      
    } catch (error) {
      console.error('Error submitting listing:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  const value: ListingFormContextType = {
    listingData,
    setListingData,
    updateListingData,
    resetListingData,
    submitListing,
    isSubmitting,
    submitError,
  };

  return (
    <ListingFormContext.Provider value={value}>
      {children}
    </ListingFormContext.Provider>
  );
};

// Custom hook to use the context
export const useListingForm = (): ListingFormContextType => {
  const context = useContext(ListingFormContext);
  if (context === undefined) {
    throw new Error('useListingForm must be used within a ListingFormProvider');
  }
  return context;
};
