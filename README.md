# 📈 PredictHub

PredictHub is a sophisticated stock price prediction and analyzing platform that combines machine learning with real-time market data analysis for naive users to start their trade journey. The application leverages LSTM (Long Short-Term Memory) neural networks to forecast stock prices based on historical data and personalized dashboard with traking favourite stocks features. 

### ✨ Key Features

- [x] Authentication System
- [x] Realtime Stock ticker tape
- [x] Personalized Dashboard
- [x] Search any ticker with suggestions
- [x] Shows open, closed, high prices of searched ticker
- [x] Shows searched Company's Details 
- [x] Adding/Removing ticker functionality into Watchlist
- [x] Preprompted chatbot for Stock Market
- [x] Candle Stick Chart for searched ticker 
- [x] Description about Stock Prediction Methods
- [x] 3 Stock Prediction DL/ML Models for next day price prediction
    - [x] LSTM (Long Short Term Memory)
    - [x] Random Forest
    - [x] ARIMA
- [x] Learning Section for naive users
- [x] Sharable and personalized Profile page
- [x] Support page for resolving user query
- [x] Contact and Feedback form connceted to the mongoDB
- [x] Supports Dark Mode 

### 🛠️ Tech Stack

**Frontend:**
- React.js with TypeScript
- Tailwind CSS for styling
- Shadcn UI components

**Backend:**
- Flask Python server

**Database**
- MongoDB 

**API**
- yfinance
- Gemini


### 🏗️ Architecture



### Installation Guide

### Server

1. Navigate to the server directory:
    ```sh
    cd server
    ```
2. Create a virtual environment:
    ```sh
    python -m venv venv
    ```
3. Activate the virtual environment:
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```
4. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```
5. Ensure you have MongoDB running and set the `MONGODB_URL` in your `.env` file:
    ```env
    MONGODB_URI=YOUR_MONGODB_URI
    ```

6. Start the server:
    ```sh
    flask run or python app.py
    ```

### Client

1. Navigate to the client directory:
    ```sh
    cd client
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm run dev
    ```
### WebApp Images


