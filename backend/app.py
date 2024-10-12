from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)  # Ensure to use __name__ here
CORS(app)

# Load your ML model here
def load_model():
    pass  # Replace with actual model loading code

model = load_model()

@app.route('/')
def home():
    return "Welcome to the Flask API!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get data from React
    title = data.get('title')
    direction = data.get('direction')
    
    # Here, you can process the data and make predictions
    if direction == 'right':
        prediction = f"You liked {title}."
    elif direction == 'left':
        prediction = f"You disliked {title}."
    else:
        prediction = "No valid direction provided."
    
    return jsonify({"prediction": prediction})

if __name__ == '__main__':
    app.run(debug=True)