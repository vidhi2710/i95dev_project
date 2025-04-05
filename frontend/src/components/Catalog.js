import React from 'react';

const Catalog = ({ products, onProductClick, browsingHistory }) => {
  // TODO: Implement a product catalog display
  // This component should display a grid of products from the catalog
  // Each product should be clickable to add to browsing history
  
  return (
    <div className="catalog-container">
      <div className="product-grid">
        {products.map(product => (
          <div 
            key={product.id} 
            className={`product-card ${browsingHistory.includes(product.id) ? 'viewed' : ''}`}
            onClick={() => onProductClick(product.id)}
          >
            <h4>{product.name}</h4>
            <p>{product.category}</p>
            <p>${product.price}</p>
            <p>Brand: {product.brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;