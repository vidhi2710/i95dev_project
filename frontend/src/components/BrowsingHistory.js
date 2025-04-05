import React from 'react';

const BrowsingHistory = ({ history, products, onClearHistory }) => {
  // TODO: Implement a browsing history display
  // This component should:
  // - Show products the user has clicked on
  // - Allow clearing the browsing history
  
  const viewedProducts = products.filter(product => history.includes(product.id));

  return (
    <div className="history-container">
      <h3>Your Browsing History</h3>
      {viewedProducts.length > 0 ? (
        <>
          <ul>
            {viewedProducts.map(product => (
              <li key={product.id}>
                <strong>{product.name}</strong> - {product.category} - ${product.price}
              </li>
            ))}
          </ul>
          <button onClick={onClearHistory}>Clear History</button>
        </>
      ) : (
        <p>You haven’t viewed any products yet.</p>
      )}
    </div>
  );
};

export default BrowsingHistory;