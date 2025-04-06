import React, { useState, useEffect } from 'react';
import './styles/App.css';

// Component imports
import Catalog from './components/Catalog';
import UserPreferences from './components/UserPreferences';
import Recommendations from './components/Recommendations';
import BrowsingHistory from './components/BrowsingHistory';
import { fetchProducts, getRecommendations } from './services/api';

function App() {
  // State to store fetched products
  const [products, setProducts] = useState([]);

  // User preferences including price range, selected categories, and brands
  const [userPreferences, setUserPreferences] = useState({
    priceRange: 'all',
    categories: [],
    brands: []
  });

   // Tracks product IDs user has interacted with
  const [browsingHistory, setBrowsingHistory] = useState([]);

  // Stores recommended products based on preferences and history
  const [recommendations, setRecommendations] = useState([]);

  // Tracks loading state during async operations
  const [isLoading, setIsLoading] = useState(false);

  // Tracks which tab is currently active (catalog, preferences, history, recommendations)
  const [activeTab, setActiveTab] = useState('catalog'); // New: current tab

  // Fetch products from the backend on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    loadProducts();
  }, []);

  // Update browsing history when a product is clicked
  const handleProductClick = (productId) => {
    if (!browsingHistory.includes(productId)) {
      setBrowsingHistory([...browsingHistory, productId]);
    }
  };

  // Update user preferences when changes are made in the Preferences tab
  const handlePreferencesChange = (newPreferences) => {
    setUserPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  // Fetch recommendations based on user preferences and browsing history
  const handleGetRecommendations = async () => {
    setIsLoading(true);
    try {
      const data = await getRecommendations(userPreferences, browsingHistory);
      setRecommendations(data.recommendations || []);
      setActiveTab('recommendations'); // Switch to tab
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Clears user's browsing history
  const handleClearHistory = () => {
    setBrowsingHistory([]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI-Powered Product Recommendation Engine</h1>
      </header>

      <div className="tab-nav">
          {[
        { key: 'catalog', label: 'Catalog' },
        { key: 'preferences', label: 'Preferences' },
        { key: 'history', label: 'History' },
        { key: 'recommendations', label: 'Recommendations' },
      ].map(({ key, label }) => (
        <button
          key={key}
          className={activeTab === key ? 'active' : ''}
          onClick={() => setActiveTab(key)}
        >
          {label}
        </button>
      ))}
      </div>

      <div className="tab-content">
        {activeTab === 'catalog' && (
          <Catalog
            products={products}
            onProductClick={handleProductClick}
            browsingHistory={browsingHistory}
          />
        )}

        {activeTab === 'preferences' && (
          <div>
            <UserPreferences
              preferences={userPreferences}
              products={products}
              onPreferencesChange={handlePreferencesChange}
            />
            <button
              className="get-recommendations-btn"
              onClick={handleGetRecommendations}
              disabled={isLoading}
            >
              {isLoading ? 'Getting Recommendations...' : 'Get Personalized Recommendations'}
            </button>
          </div>
        )}

        {activeTab === 'history' && (
          <BrowsingHistory
            history={browsingHistory}
            products={products}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeTab === 'recommendations' && (
          <Recommendations
            recommendations={recommendations}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;
