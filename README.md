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

![Untitled-2024-11-28-2216](https://github.com/user-attachments/assets/3fa6ac3e-55dd-46ce-a999-8c2ea2edd349)

---

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

---

### WebApp Images

![image](https://github.com/user-attachments/assets/f6f2ce2c-9104-42ab-ac71-ab82e29842b0)

![Screenshot 2024-11-23 113510](https://github.com/user-attachments/assets/513847d9-5155-4879-a33e-f8a8fe1061b3)

![Screenshot 2024-11-24 111016](https://github.com/user-attachments/assets/7a9a6708-ff86-47cb-b3ff-746e85e02f3d)
