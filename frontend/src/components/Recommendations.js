import React from 'react';

const Recommendations = ({ recommendations, isLoading }) => {
  // TODO: Implement a display for recommended products
  // This component should:
  // - Display recommended products with explanations
  // - Show a loading state when recommendations are being generated
  // - Handle cases where no recommendations are available
  
  return (
    <div className="recommendations-container">
      {isLoading ? (
        <p>Loading recommendations...</p>
      ) : recommendations.length > 0 ? (
        <ul className="recommendations-list">
          {recommendations.map((rec, index) => (
            <li key={index} className="recommendation-item">
              <strong>{rec.product.name}</strong> - {rec.product.category} - ${rec.product.price}<br />
              <em>{rec.explanation}</em> <br />
              Confidence Score: {rec.confidence_score}/10
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations yet. Set your preferences and browse some products!</p>
      )}
    </div>
  );
};

export default Recommendations;
