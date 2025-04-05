import React, { useState } from 'react';

// Modal Component
const ProductModal = ({ product, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{product.name}</h2>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Rating:</strong> {product.rating} / 5</p>
        <p><strong>Inventory:</strong> {product.inventory} items in stock</p>
        <p><strong>Features:</strong></p>
        <ul>
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
      </div>
    </div>
  );
};

const Catalog = ({ products, onProductClick, browsingHistory }) => {
  // TODO: Implement a product catalog display
  // This component should display a grid of products from the catalog
  // Each product should be clickable to add to browsing history

 // State to manage the modal visibility and which product is selected
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedProduct, setSelectedProduct] = useState(null);

 // Handle product card click to add to browsing history and show the modal
 const handleProductClick = (product) => {
   // Add to browsing history if it's not already there
   if (!browsingHistory.includes(product.id)) {
     onProductClick(product.id);
   }
   setSelectedProduct(product);
   setIsModalOpen(true); // Open the modal
 };

 // Close the modal
 const closeModal = () => {
   setIsModalOpen(false);
   setSelectedProduct(null);
 };

 return (
   <div className="catalog-container">
     <div className="product-grid">
       {products.map((product) => (
         <div
           key={product.id}
           className={`product-card ${browsingHistory.includes(product.id) ? 'viewed' : ''}`}
           onClick={() => handleProductClick(product)} // Handle click for product details
         >
           {browsingHistory.includes(product.id) && (
             <span className="viewed-badge">Viewed</span>
           )}

           <div className="product-info">
             <h3 className="product-name">{product.name}</h3>
             <p className="product-category">{product.category}</p>
             <p className="product-price">${product.price}</p>
             <p className="product-brand">Brand: {product.brand}</p>
           </div>
         </div>
       ))}
     </div>

     {/* Render the modal if it's open */}
     {isModalOpen && selectedProduct && (
       <ProductModal product={selectedProduct} onClose={closeModal} />
     )}
   </div>
  
  // return (
  //   <div className="catalog-container">
  //     <div className="product-grid">
  //       {products.map(product => (
  //         <div
  //           key={product.id}
  //           className={`product-card ${browsingHistory.includes(product.id) ? 'viewed' : ''}`}
  //           onClick={() => onProductClick(product.id)}
  //         >
  //           {browsingHistory.includes(product.id) && (
  //             <span className="viewed-badge">Viewed</span>
  //           )}
  //           <div className="product-info">
  //             <h3 className="product-name">{product.name}</h3>
  //             <p className="product-category">{product.category}</p>
  //             <p className="product-price">${product.price}</p>
  //             <p className="product-brand">Brand: {product.brand}</p>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  );
};

export default Catalog;