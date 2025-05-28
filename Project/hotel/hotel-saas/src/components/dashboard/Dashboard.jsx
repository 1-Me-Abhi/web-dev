import { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import BookingHistory from './BookingHistory';
import UserProfile from './UserProfile';
import Preferences from './Preferences';
import PaymentMethods from './PaymentMethods';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'bookings':
        return <BookingHistory />;
      case 'profile':
        return <UserProfile />;
      case 'preferences':
        return <Preferences />;
      case 'payments':
        return <PaymentMethods />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 bg-white rounded-lg shadow-md p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
} 