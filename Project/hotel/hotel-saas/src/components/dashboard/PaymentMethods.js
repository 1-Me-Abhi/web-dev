import { useState } from 'react';

export default function PaymentMethods() {
  const [showAddCard, setShowAddCard] = useState(false);
  const [savedCards, setSavedCards] = useState([
    {
      id: 1,
      type: 'visa',
      lastFour: '4242',
      expiryMonth: '12',
      expiryYear: '2024',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      lastFour: '8888',
      expiryMonth: '09',
      expiryYear: '2025',
      isDefault: false
    }
  ]);

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    name: ''
  });

  const handleSetDefault = (cardId) => {
    setSavedCards(cards =>
      cards.map(card => ({
        ...card,
        isDefault: card.id === cardId
      }))
    );
  };

  const handleDeleteCard = (cardId) => {
    setSavedCards(cards => cards.filter(card => card.id !== cardId));
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    // TODO: Implement card validation and addition logic
    setShowAddCard(false);
    setNewCard({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      name: ''
    });
  };

  const getCardIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'visa':
        return '💳'; // Replace with actual card icons
      case 'mastercard':
        return '💳';
      default:
        return '💳';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Payment Methods</h2>
        <button
          onClick={() => setShowAddCard(!showAddCard)}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
        >
          {showAddCard ? 'Cancel' : '+ Add New Card'}
        </button>
      </div>

      {showAddCard && (
        <form onSubmit={handleAddCard} className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={newCard.cardNumber}
                onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Month
              </label>
              <input
                type="text"
                value={newCard.expiryMonth}
                onChange={(e) => setNewCard({ ...newCard, expiryMonth: e.target.value })}
                placeholder="MM"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Year
              </label>
              <input
                type="text"
                value={newCard.expiryYear}
                onChange={(e) => setNewCard({ ...newCard, expiryYear: e.target.value })}
                placeholder="YYYY"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                value={newCard.cvv}
                onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                placeholder="123"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name on Card
              </label>
              <input
                type="text"
                value={newCard.name}
                onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Card
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {savedCards.map((card) => (
          <div
            key={card.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{getCardIcon(card.type)}</span>
                <div>
                  <p className="font-medium">
                    {card.type.charAt(0).toUpperCase() + card.type.slice(1)} ending in {card.lastFour}
                  </p>
                  <p className="text-sm text-gray-600">
                    Expires {card.expiryMonth}/{card.expiryYear}
                  </p>
                </div>
              </div>
              {card.isDefault && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Default
                </span>
              )}
            </div>

            <div className="flex space-x-4">
              {!card.isDefault && (
                <button
                  onClick={() => handleSetDefault(card.id)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Set as Default
                </button>
              )}
              <button
                onClick={() => handleDeleteCard(card.id)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 