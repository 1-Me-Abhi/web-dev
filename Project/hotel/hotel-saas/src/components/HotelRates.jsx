import { useEffect, useState } from "react";
import { getHotelRates } from "../api/getHotelRates";
import "./HotelRates.css";

// Currency symbols mapping
const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  CNY: "¥",
  RUB: "₽",
  SGD: "S$"
};

const HotelRates = ({ hotelKey, checkIn, checkOut, currency = "USD" }) => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        setError(null);
        // Call getHotelRates with params object matching our new implementation
        const data = await getHotelRates({
          hotelKey,
          checkIn,
          checkOut,
          currency
        });
        setRates(data || []);
      } catch (error) {
        console.error("Error fetching hotel rates:", error);
        setError("Failed to load rates. Using default rates.");
        setRates([]); // Set to empty array to avoid undefined
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [hotelKey, checkIn, checkOut, currency]);

  // Get the appropriate currency symbol
  const getCurrencySymbol = (currencyCode) => {
    return currencySymbols[currencyCode] || currencyCode;
  };

  // Determine if a rate should get a special badge
  const getRateBadge = (rate) => {
    if (!rate || !rate.name) return null;
    
    if (rate.name.toLowerCase().includes("non-refundable")) {
      return <span className="rate-badge rate-badge-discount">Best Price</span>;
    }
    if (rate.name.toLowerCase().includes("package")) {
      return <span className="rate-badge rate-badge-special">Package</span>;
    }
    return null;
  };

  if (loading) return <p className="loading-message">Loading rates...</p>;
  
  if (error) {
    console.warn(error);
  }

  // Ensure rates is always an array
  const safeRates = Array.isArray(rates) ? rates : [];

  return (
    <div className="rates-container">
      {safeRates.length > 0 ? (
        safeRates.map((rate) => (
          <div
            key={rate.id || Math.random()}
            className="rate-card"
          >
            <div>
              <div className="rate-name">
                {rate.name}
                {getRateBadge(rate)}
              </div>
              {rate.description && (
                <div className="rate-details">{rate.description}</div>
              )}
              {rate.mealPlan && (
                <div className="rate-meal-plan">{rate.mealPlan}</div>
              )}
              {rate.cancellationPolicy && (
                <div className="rate-policy">{rate.cancellationPolicy}</div>
              )}
            </div>
            <span className="rate-price">
              <span className="rate-currency">{getCurrencySymbol(rate.currency)}</span>
              {rate.price}
            </span>
          </div>
        ))
      ) : (
        <p className="no-rates-message">No rates available</p>
      )}
    </div>
  );
};

export default HotelRates; 