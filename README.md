# 📈 PredictHub

PredictHub is a sophisticated stock price prediction platform that combines machine learning with real-time market data analysis. The application leverages LSTM (Long Short-Term Memory) neural networks to forecast stock prices based on historical data. 🤖

### ✨ Key Features

- 🔮 **Stock Price Predictions**: Utilizes deep learning LSTM models to generate price forecasts
- 📊 **Real-Time Market Data**: Integrates with Yahoo Finance API to fetch current stock information
- 📈 **Interactive Charts**: Visualizes stock data through interactive candlestick charts
- 🔐 **User Authentication**: Secure login system with GitHub OAuth integration
- 📱 **Responsive Design**: Modern UI built with React and Tailwind CSS

### 🛠️ Tech Stack

**Frontend:**
- ⚛️ React.js with TypeScript
- 🎨 Tailwind CSS for styling
- 🎯 Shadcn UI components
- 📊 Chart.js for data visualization

**Backend:**
- 🐍 Flask Python server
- 🗄️ MongoDB database
- 🧠 LSTM neural networks for predictions
- 📡 Yahoo Finance API integration

### 🏗️ Architecture

The application follows a client-server architecture:
- 🖥️ Frontend makes API calls to fetch predictions and stock data
- ⚙️ Backend processes requests, runs ML models, and manages authentication
- ⚡ Real-time data is fetched from Yahoo Finance
- 🤖 Predictions are generated using pre-trained LSTM models



## Installation Guide

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
5. Ensure you have MongoDB running and set the `MONGODB_URL` and to use GithubOAuth you need Github_ClientId and Github_ClientSecret from the Github account in your `.env` file:
    ```env
    MONGODB_URI=YOUR_MONGODB_URI
    GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
    GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
    ```
Follow this documentation to get the Github_ClientId and Github_ClientSecret: [Github OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
6. Start the server:
    ```sh
    flask run
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

## Project Structure

```
predicthub/
├── client/                 
│   ├── public/            
│   ├── src/               
│   │   ├── components/    
│   │   ├── pages/        
│   │   ├── styles/       
│   │   └── utils/        
│   ├── package.json
│   └── vite.config.ts
│
├── server/ 
|   ├── venv/              
│   ├── api/              
│   ├── models/           
│   ├── services/         
│   ├── utils/            
│   ├── requirements.txt
│   └── app.py           
│
├── LICENSE
└── README.md
```

