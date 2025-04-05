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
        {/* <p>Categories:</p>
        {visibleCategories.map(category => (
          <div key={category}>
            <input
              type="checkbox"
              id={`cat-${category}`}
              checked={preferences.categories.includes(category)}
              onChange={() => handleCheckboxChange("categories", category)}
            />
            <label htmlFor={`cat-${category}`}>{category}</label>
          </div>
        ))}
        {uniqueCategories.length > 2 && (
          <button type="button" className="show-more-btn" onClick={() => setShowAllCategories(!showAllCategories)}>
            {showAllCategories ? 'Show Less' : 'Show More'}
          </button>
        )} */}
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
  {!showAllCategories && (
    <span
      style={{ color: 'blue', cursor: 'pointer', fontSize: '14px' }}
      onClick={() => setShowAllCategories(true)}
    >
      Show More
    </span>
  )}

      </div>

      <div className="pref-group">
        {/* <p>Brands:</p>
        {visibleBrands.map(brand => (
          <div key={brand}>
            <input
              type="checkbox"
              id={`brand-${brand}`}
              checked={preferences.brands.includes(brand)}
              onChange={() => handleCheckboxChange("brands", brand)}
            />
            <label htmlFor={`brand-${brand}`}>{brand}</label>
          </div>
        ))}
        {uniqueBrands.length > 2 && (
          <button type="button" className="show-more-btn" onClick={() => setShowAllBrands(!showAllBrands)}>
            {showAllBrands ? 'Show Less' : 'Show More'}
          </button>
        )} */}
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
  {!showAllBrands && (
    <span
      style={{ color: 'blue', cursor: 'pointer', fontSize: '14px' }}
      onClick={() => setShowAllBrands(true)}
    >
      Show More
    </span>
  )}

      </div>
    </div>
  );
};

export default UserPreferences;

// import React from 'react';

// const UserPreferences = ({ preferences, products, onPreferencesChange }) => {
//   // TODO: Implement a form for capturing user preferences
//   // This component should include:
//   // - Price range selection
//   // - Category selection (checkboxes or multi-select)
//   // - Brand selection
//   // - Any other relevant preference options
  
//   const uniqueCategories = [...new Set(products.map(p => p.category))];
//   const uniqueBrands = [...new Set(products.map(p => p.brand))];

//   const handleCheckboxChange = (type, value) => {
//     const current = preferences[type];
//     const newValues = current.includes(value)
//       ? current.filter(v => v !== value)
//       : [...current, value];
//     onPreferencesChange({ [type]: newValues });
//   };

//   return (
//     <div className="preferences-container">
//       <h3>Your Preferences</h3>

//       <div>
//         <label>Price Range:</label>
//         <select
//           value={preferences.priceRange}
//           onChange={e => onPreferencesChange({ priceRange: e.target.value })}
//         >
//           <option value="all">All</option>
//           <option value="low">Under $50</option>
//           <option value="medium">$50 - $200</option>
//           <option value="high">Over $200</option>
//         </select>
//       </div>

//       <div>
//         <label>Categories:</label>
//         {uniqueCategories.map(category => (
//           <div key={category}>
//             <input
//               type="checkbox"
//               checked={preferences.categories.includes(category)}
//               onChange={() => handleCheckboxChange("categories", category)}
//             />
//             {category}
//           </div>
//         ))}
//       </div>

//       <div>
//         <label>Brands:</label>
//         {uniqueBrands.map(brand => (
//           <div key={brand}>
//             <input
//               type="checkbox"
//               checked={preferences.brands.includes(brand)}
//               onChange={() => handleCheckboxChange("brands", brand)}
//             />
//             {brand}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserPreferences;