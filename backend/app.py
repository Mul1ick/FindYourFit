from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)  # Corrected the double underscore
CORS(app, resources={r"/*": {"origins": "http://localhost:5174"}})


# Load the embeddings model from the pickle file
def load_model():
    try:
        with open('embedding.pkl', 'rb') as file:
            model = pickle.load(file)
        print("Model loaded successfully.")
        print(model.columns)  # Log model's columns to check if 'id' exists
        print(model.head())  # To see the first few rows and inspect the actual data structure
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

model = load_model()


@app.route('/')
def home():
    return "Welcome to the Flask API!"


@app.route('/predict', methods=['POST'])
def predict():
    try:
        print("Headers:", request.headers)  # Log headers
        data = request.get_json()
        print("Received data:", data)  # Log received data
        if not data:
            return jsonify({"error": "No input data provided."}), 400

        # Extract id, title, and direction from the request body
        item_id = data.get('id')
        title = data.get('title')
        direction = data.get('direction')

        # Log values to debug
        print(f"item_id: {item_id}, title: {title}, direction: {direction}")

        # Check if 'id', 'title', and 'direction' are provided
        if item_id is None or title is None or direction is None:
            return jsonify({"error": "Invalid input. 'id', 'title', and 'direction' are required."}), 400

        # Sample swipe logic based on the direction
        if direction == 'right':
            prediction = f"You liked {title} (ID: {item_id})."
        elif direction == 'left':
            prediction = f"You disliked {title} (ID: {item_id})."
        else:
            return jsonify({"error": "Invalid direction provided."}), 400

        # Use the model to generate recommendations (modify as per your actual model implementation)
        if model is not None:
            id_index = model.index[model['id'] == item_id]
            if not id_index.empty:
                similarity_scores = model.similarity[id_index].values[0]
                top_recommendations = similarity_scores.argsort()[-5:][::-1]
                recommendation_images = model.iloc[top_recommendations]['image'].tolist()
                prediction = {"recommendations": recommendation_images}
            else:
                title_index = model.index[model['title'] == title]
                if not title_index.empty:
                    similarity_scores = model.similarity[title_index].values[0]
                    top_recommendations = similarity_scores.argsort()[-5:][::-1]
                    recommendation_images = model.iloc[top_recommendations]['image'].tolist()
                    prediction = {"recommendations": recommendation_images}
                else:
                    prediction = "No matching id or title found in the model."

        return jsonify({"prediction": prediction})

    except Exception as e:
        print(f"Exception occurred: {e}")  # Print exception to console
        return jsonify({"error": str(e)}), 500


# Running the server on localhost:5000
if __name__ == '__main__':  # Corrected the double underscores
    app.run(debug=True, host='127.0.0.1', port=5000)
