# Admin Bookings Page

## Overview
The Admin Bookings page allows administrators to view and manage all booking requests in a table format. The page is accessible at `/admin-bookings` and includes functionality to confirm or reject pending bookings.

## Features

### Table Display
- **Customer Name**: Name of the customer who made the booking
- **Location**: Service location
- **Date & Time**: Formatted date and time of the booking
- **Amount**: Booking amount in dollars
- **Service**: Type of service requested
- **Status**: Current booking status with color-coded badges
- **Actions**: Confirm/Reject buttons for pending bookings

### Status Management
- **Pending**: Yellow badge - Can be confirmed or rejected
- **Confirmed**: Green badge - Booking has been approved
- **Rejected**: Red badge - Booking has been declined
- **Completed**: Blue badge - Service has been completed

### Actions
- **Confirm**: Approves the booking and updates status to "confirmed"
- **Reject**: Declines the booking and updates status to "rejected"
- **Loading States**: Buttons show "Updating..." during API calls

## API Integration

### Endpoints Used
1. **GET** `/api/bookings/expert/{email}/` - Fetches bookings for the expert
2. **PATCH** `/api/expert/update-booking-status/` - Updates booking status

### Request Format for Status Update
```json
{
  "booking_id": 123,
  "status": "confirm" // or "reject"
}
```

### Response Format
```json
{
  "message": "Booking status updated to 'confirm'."
}
```

## Navigation
The page is accessible through:
- Direct URL: `/admin-bookings`
- Admin navigation menu: "Bookings" link

## Styling
- Responsive table design
- Dark mode support
- Hover effects on table rows
- Color-coded status badges
- Loading spinner for data fetching
- Disabled buttons during updates

## Error Handling
- API error logging to console
- Graceful handling of network failures
- User feedback during loading states

## Dependencies
- React hooks for state management
- Axios for API calls
- Tailwind CSS for styling
- React Router for navigation
- Authentication context for user data 