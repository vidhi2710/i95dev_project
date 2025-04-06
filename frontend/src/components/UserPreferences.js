import React, { useState } from 'react';

const UserPreferences = ({ preferences, products, onPreferencesChange }) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const uniqueCategories = [...new Set(products.map(p => p.category))];
  const uniqueBrands = [...new Set(products.map(p => p.brand))];

  const visibleCategories = showAllCategories ? uniqueCategories : uniqueCategories.slice(0, 2);
  const visibleBrands = showAllBrands ? uniqueBrands : uniqueBrands.slice(0, 2);

  const handleCheckboxChange = (type, value) => {
    const current = preferences[type];
    const newValues = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onPreferencesChange({ [type]: newValues });
  };

  return (
    <div className="preferences-container">
      <h3>Your Preferences</h3>

      <div className="pref-group">
        <label htmlFor="price">Price Range:</label>
        <select
          id="price"
          value={preferences.priceRange}
          onChange={e => onPreferencesChange({ priceRange: e.target.value })}
        >
          <option value="all">All</option>
          <option value="low">Under $50</option>
          <option value="medium">$50 - $200</option>
          <option value="high">Over $200</option>
        </select>
      </div>

      <div className="pref-group">
        <strong>Categories:</strong>
        {visibleCategories.map(category => (
          <label key={category} style={{ display: 'block', marginBottom: '4px' }}>
            <input
              type="checkbox"
              checked={preferences.categories.includes(category)}
              onChange={() => handleCheckboxChange("categories", category)}
              style={{ marginRight: '8px' }}
            />
            {category}
          </label>
        ))}
         <button
          className="preference-toggle-btn"
          onClick={() => setShowAllCategories(prev => !prev)}
        >
          {showAllCategories ? 'Show Less' : 'Show More'}
        </button>

      </div>

      <div className="pref-group">
        <strong>Brands:</strong>
        {visibleBrands.map(brand => (
          <label key={brand} style={{ display: 'block', marginBottom: '4px' }}>
            <input
              type="checkbox"
              checked={preferences.brands.includes(brand)}
              onChange={() => handleCheckboxChange("brands", brand)}
              style={{ marginRight: '8px' }}
            />
            {brand}
          </label>
        ))}
        <button
          className="preference-toggle-btn"
          onClick={() => setShowAllBrands(prev => !prev)}
        >
          {showAllBrands ? 'Show Less' : 'Show More'}
        </button>

      </div>
    </div>
  );
};

export default UserPreferences;