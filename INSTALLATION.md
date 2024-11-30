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
        ./venv/Scripts/activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```
4. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```
5. Ensure you have content in `.env` file (`.env.example` is provided):
    ```env
    MONGO_URI=YOUR_MONGO_URI
    CLOUDINARY_CLOUD_NAME=CLOUD_NAME
    CLOUDINARY_API_KEY=API_KEY
    CLOUDINARY_API_SECRET=API_SECRET
    GOOGLE_API_KEY=GEMINI_API_KEY
    ```

6. Start the server:
    ```sh
    flask run or python app.py
    ```

The server will be running on `http://localhost:5000`

### Prediction

ML Modles

1. Navigate to the server directory:
    ```sh
    cd prediction/MLModels
    ```
2. Create a virtual environment:
    ```sh
    python -m venv venv
    ```
3. Activate the virtual environment:
    - On Windows:
        ```sh
        ./venv/Scripts/activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```
4. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

6. Start the MLModels:
    ```sh
    flask run or python app.py
    ```

The MLModels will be running on `http://localhost:5001`

DL Modles

1. Navigate to the server directory:
    ```sh
    cd prediction/DLModels
    ```
2. Create a virtual environment:
    ```sh
    python -m venv venv
    ```
3. Activate the virtual environment:
    - On Windows:
        ```sh
        ./venv/Scripts/activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```
4. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

6. Start the DLModels:
    ```sh
    flask run or python app.py
    ```

The DLModels will be running on `http://localhost:5002`

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

The client will be running on `http://localhost:5173`