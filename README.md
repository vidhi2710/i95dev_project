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


```
backend/
│
├── app.py               # Main FastAPI application
├── requirements.txt     # Python dependencies
├── config.py            # Configuration (add your API keys here)
├── data/
│   └── products.json    # Sample product catalog
│
├── services/
│   ├── __init__.py
│   ├── llm_service.py   # Service for LLM interactions (implement this)
│   └── product_service.py  # Service for product data operations
│
└── README.md 
```

```
frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── App.js           # Main application component
│   ├── index.js         # Entry point
│   ├── components/
│   │   ├── Catalog.js   # Product catalog display (implement this)
│   │   ├── UserPreferences.js  # Preference form (implement this)
│   │   ├── Recommendations.js  # Recommendations display (implement this)
│   │   └── BrowsingHistory.js  # Browsing history component (implement this)
│   │
│   ├── services/
│   │   └── api.js       # API client for backend communication
│   │
│   └── styles/
│       └── App.css      # Styling
│
├── package.json         # NPM dependencies
└── README.md        
```

---

## 🚀 Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js (for frontend)
- OpenAI API Key (or mocked for local testing)

---

### Backend Setup

Create a `.env` file in the backend directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   MODEL_NAME=gpt-3.5-turbo
   MAX_TOKENS=1000
   TEMPERATURE=0.7
   DATA_PATH=data/products.json
   ```

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
Frontend runs at http://localhost:3000, backend at http://localhost:5000.

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
