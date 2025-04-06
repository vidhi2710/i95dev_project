# 🛍️ AI-Powered Product Recommendation Engine

An intelligent product recommendation system that leverages user preferences, browsing history, and LLM-powered explanations to personalize product suggestions.

---

## ✨ Features

- 📦 Product catalog with filters and interactive browsing
- ❤️ User preferences (categories, price range, brands)
- 📜 Browsing history tracking
- 🤖 AI-powered recommendations with explanations
- 💬 Prompt engineering with dynamic adaptation
- 🧪 Backend tests for recommendation quality
- ⚛️ Clean, responsive React UI

---

## 📁 Project Structure

├── backend/ │ ├── llm_service.py # Core logic for LLM prompting │ ├── main.py # FastAPI app for recommendations │ └── test_candidate.py # End-to-end and unit test coverage ├── frontend/ │ ├── src/ │ │ ├── App.js # Main stateful container │ │ ├── components/ │ │ │ ├── Catalog.js │ │ │ ├── UserPreferences.js │ │ │ ├── BrowsingHistory.js │ │ │ ├── Recommendations.js │ │ │ └── ProductModal.js │ │ └── index.css # Styling ├── data/ │ └── products.json # Product catalog (sample data) ├── README.md └── requirements.txt


---

## 🚀 Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js (for frontend)
- OpenAI API Key (or mocked for local testing)

---

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs at http://localhost:3000, backend at http://localhost:8000.

## 🧠 Prompt Engineering Approach
LLM recommendations are generated via OpenAI GPT API based on user preferences and browsing history.

### 🔍 Prompt Structure
User Preferences:
- Categories: Electronics, Home
- Price Range: $50-$200
- Favorite Brands: Samsung, Sony

Browsing History:
1. Sony Headphones - Electronics - $120
2. Samsung Soundbar - Electronics - $180

### Prompt:
You are an expert product recommendation engine for an eCommerce platform. Your task is to recommend 5 personalized products based on:
1. User's preferences
2. Products they recently browsed
3. The product catalog

### 🧠 Dynamic Prompting
Preferences and history are dynamically inserted into the prompt.

Products shown are filtered based on user-defined constraints before LLM evaluation.

Explanation is generated using the format:

"This product matches the user's interest in...."

✅ Prompt Goals
Maximize personalization

Provide transparency with reasoning

Keep prompts token-efficient

## 🧪 Tests
```bash
cd tests
python test.py
```
- Endpoint testing
- Product filtering logic
- Prompt structure and LLM fallback

## 📬 Contact
For queries or improvements, feel free to open an issue or submit a pull request!
