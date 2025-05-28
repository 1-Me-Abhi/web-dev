export default function DashboardSidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'profile', label: 'My Profile', icon: 'person' },
    { id: 'bookings', label: 'Booking History', icon: 'calendar_month' },
    { id: 'preferences', label: 'Preferences', icon: 'settings' },
    { id: 'payments', label: 'Payment Methods', icon: 'credit_card' },
  ];

  return (
    <aside className="w-full md:w-64 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 