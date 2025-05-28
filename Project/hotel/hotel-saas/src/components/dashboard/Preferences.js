import { useState } from 'react';

export default function Preferences() {
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      sms: false,
      promotions: true,
      bookingReminders: true,
      newsletter: false
    },
    roomPreferences: {
      smoking: false,
      floorLevel: 'any',
      bedType: 'any',
      accessibility: false
    },
    dietaryRestrictions: []
  });

  const handleNotificationChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleRoomPreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      roomPreferences: {
        ...prev.roomPreferences,
        [key]: value
      }
    }));
  };

  const handleDietaryRestrictionChange = (restriction) => {
    setPreferences(prev => {
      const restrictions = [...prev.dietaryRestrictions];
      const index = restrictions.indexOf(restriction);
      
      if (index === -1) {
        restrictions.push(restriction);
      } else {
        restrictions.splice(index, 1);
      }

      return {
        ...prev,
        dietaryRestrictions: restrictions
      };
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Preferences</h2>
        <p className="text-gray-600 mb-8">Customize your stay and communication preferences.</p>
      </div>

      {/* Notification Preferences */}
      <section>
        <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(preferences.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              </label>
              <button
                onClick={() => handleNotificationChange(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Room Preferences */}
      <section>
        <h3 className="text-lg font-medium mb-4">Room Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Smoking Room</span>
            <button
              onClick={() => handleRoomPreferenceChange('smoking', !preferences.roomPreferences.smoking)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.roomPreferences.smoking ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.roomPreferences.smoking ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Floor Level
            </label>
            <select
              value={preferences.roomPreferences.floorLevel}
              onChange={(e) => handleRoomPreferenceChange('floorLevel', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="any">Any Floor</option>
              <option value="low">Lower Floor (1-3)</option>
              <option value="mid">Middle Floor (4-7)</option>
              <option value="high">Higher Floor (8+)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bed Type Preference
            </label>
            <select
              value={preferences.roomPreferences.bedType}
              onChange={(e) => handleRoomPreferenceChange('bedType', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="any">Any Type</option>
              <option value="king">King Size</option>
              <option value="queen">Queen Size</option>
              <option value="twin">Twin Beds</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span>Accessibility Requirements</span>
            <button
              onClick={() => handleRoomPreferenceChange('accessibility', !preferences.roomPreferences.accessibility)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.roomPreferences.accessibility ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.roomPreferences.accessibility ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Dietary Restrictions */}
      <section>
        <h3 className="text-lg font-medium mb-4">Dietary Restrictions</h3>
        <div className="grid grid-cols-2 gap-4">
          {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut Allergy', 'Shellfish Allergy'].map((restriction) => (
            <label key={restriction} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.dietaryRestrictions.includes(restriction)}
                onChange={() => handleDietaryRestrictionChange(restriction)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>{restriction}</span>
            </label>
          ))}
        </div>
      </section>

      <div className="pt-6">
        <button
          type="button"
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
} 