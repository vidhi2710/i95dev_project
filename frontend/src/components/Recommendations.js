import React, { useState } from 'react';

const Recommendations = ({ recommendations, isLoading }) => {
  // TODO: Implement a display for recommended products
  // This component should:
  // - Display recommended products with explanations
  // - Show a loading state when recommendations are being generated
  // - Handle cases where no recommendations are available
  
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => setSelectedProduct(null);

  const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
      <div className="product-modal-overlay">
        <div className="product-modal">
          <button className="close-modal-btn" onClick={onClose}>
            &times;
          </button>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Category:</strong> {product.category} &gt; {product.subcategory}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Rating:</strong> {product.rating} / 5</p>
          <p><strong>Inventory:</strong> {product.inventory}</p>
          <p><strong>Tags:</strong> {product.tags?.join(', ')}</p>
          <p><strong>Features:</strong></p>
          <ul>
            {product.features?.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="recommendations-section">
      <h2>Recommendations</h2>
      {isLoading ? (
        <p>Loading recommendations...</p>
      ) : recommendations.length > 0 ? (
        <ul className="recommendations-list">
          {recommendations.map((rec, index) => (
            <li
              key={index}
              className="recommendation-item product-card"
              onClick={() => handleProductClick(rec.product)}
            >
              <div className="product-info">
                <span className="product-name">{rec.product.name}</span>
                <span className="product-category">{rec.product.category}</span>
                <span className="product-price">${rec.product.price}</span>
                <span className="product-brand">{rec.product.brand}</span>
              </div>
              <em>{rec.explanation}</em>
              <p>Confidence Score: {rec.confidence_score}/10</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations yet. Set your preferences and browse some products!</p>
      )}

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
};

export default Recommendations;
