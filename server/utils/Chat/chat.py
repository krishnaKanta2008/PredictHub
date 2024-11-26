import google.generativeai as genai
from dotenv import load_dotenv
import os
from flask import request, jsonify

load_dotenv()

os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

generation_config = {
    "temperature": 0.5,  
    "top_p": 0.95,
    "top_k": 50,
    "max_output_tokens": 500,  
    "response_mime_type": "text/plain",
}

# Initialize the model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

pre_prompt = """
You are PredictHub, a specialized financial assistant and stock market expert. Your expertise lies in providing insights, analysis, and forecasts related to financial markets, stocks, investment strategies, and economic trends. You also understand and explain financial models and methodologies. Respond to all questions within this domain using accurate, concise, and actionable advice and dont add any markdown in your response.

You will not answer queries unrelated to financial topics or stock markets. If a user greets you (e.g., "hi" or "hello"), politely respond with a warm greeting, but do not engage in unrelated discussions.

For example:

Allowed topics: stock market analysis, financial planning, economic indicators, portfolio diversification.
Prohibited topics: unrelated personal questions, non-financial advice, or general topics beyond your expertise.
End each response by offering further assistance within your expertise.
"""

def chat_model():
    user_input = request.json.get("user_input")
    response = model.generate_content(pre_prompt+user_input)
    response_text = response.text 
    return jsonify({"response": response_text})