import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Catalog from './components/Catalog';
import UserPreferences from './components/UserPreferences';
import Recommendations from './components/Recommendations';
import BrowsingHistory from './components/BrowsingHistory';
import { fetchProducts, getRecommendations } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    priceRange: 'all',
    categories: [],
    brands: []
  });
  const [browsingHistory, setBrowsingHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('catalog'); // 👈 New: current tab

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

  const handleProductClick = (productId) => {
    if (!browsingHistory.includes(productId)) {
      setBrowsingHistory([...browsingHistory, productId]);
    }
  };

  const handlePreferencesChange = (newPreferences) => {
    setUserPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    try {
      const data = await getRecommendations(userPreferences, browsingHistory);
      setRecommendations(data.recommendations || []);
      setActiveTab('recommendations'); // 👈 Switch to tab
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setBrowsingHistory([]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI-Powered Product Recommendation Engine</h1>
      </header>

      <div className="tab-nav">
        <button onClick={() => setActiveTab('catalog')}>Catalog</button>
        <button onClick={() => setActiveTab('preferences')}>Preferences</button>
        <button onClick={() => setActiveTab('history')}>History</button>
        <button onClick={() => setActiveTab('recommendations')}>Recommendations</button>
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


// import React, { useState, useEffect } from 'react';
// import './styles/App.css';
// import Catalog from './components/Catalog';
// import UserPreferences from './components/UserPreferences';
// import Recommendations from './components/Recommendations';
// import BrowsingHistory from './components/BrowsingHistory';
// import { fetchProducts, getRecommendations } from './services/api';

// function App() {
//   // State for products catalog
//   const [products, setProducts] = useState([]);
  
//   // State for user preferences
//   const [userPreferences, setUserPreferences] = useState({
//     priceRange: 'all',
//     categories: [],
//     brands: []
//   });
  
//   // State for browsing history
//   const [browsingHistory, setBrowsingHistory] = useState([]);
  
//   // State for recommendations
//   const [recommendations, setRecommendations] = useState([]);
  
//   // State for loading status
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Fetch products on component mount
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const data = await fetchProducts();
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
    
//     loadProducts();
//   }, []);
  
//   // Handle product click to add to browsing history
//   const handleProductClick = (productId) => {
//     // Avoid duplicates in browsing history
//     if (!browsingHistory.includes(productId)) {
//       setBrowsingHistory([...browsingHistory, productId]);
//     }
//   };
  
//   // Update user preferences
//   const handlePreferencesChange = (newPreferences) => {
//     setUserPreferences(prevPreferences => ({
//       ...prevPreferences,
//       ...newPreferences
//     }));
//   };
  
//   // Get recommendations based on preferences and browsing history
//   const handleGetRecommendations = async () => {
//     setIsLoading(true);
//     try {
//       const data = await getRecommendations(userPreferences, browsingHistory);
//       setRecommendations(data.recommendations || []);
//     } catch (error) {
//       console.error('Error getting recommendations:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Clear browsing history
//   const handleClearHistory = () => {
//     setBrowsingHistory([]);
//   };
  
//   return (
//     <div className="app">
//       <header className="app-header">
//         <h1>AI-Powered Product Recommendation Engine</h1>
//       </header>
      
//       <main className="app-content">
//         <div className="user-section">
//           <UserPreferences 
//             preferences={userPreferences}
//             products={products}
//             onPreferencesChange={handlePreferencesChange}
//           />
          
//           <BrowsingHistory 
//             history={browsingHistory}
//             products={products}
//             onClearHistory={handleClearHistory}
//           />
          
//           <button 
//             className="get-recommendations-btn"
//             onClick={handleGetRecommendations}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Getting Recommendations...' : 'Get Personalized Recommendations'}
//           </button>
//         </div>
        
//         <div className="catalog-section">
//           <h2>Product Catalog</h2>
//           <Catalog 
//             products={products}
//             onProductClick={handleProductClick}
//             browsingHistory={browsingHistory}
//           />
//         </div>
        
//         <div className="recommendations-section">
//           <h2>Your Recommendations</h2>
//           <Recommendations 
//             recommendations={recommendations}
//             isLoading={isLoading}
//           />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;