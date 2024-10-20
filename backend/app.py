from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5174"}})


# Load the embeddings model from the pickle file
# Load the embeddings model from the pickle file
def load_model():
    try:
        with open('updated_embedding.pkl', 'rb') as file:
            model = pickle.load(file)
        print("Model loaded successfully.")
        print("Model columns: ", model.columns)  # Log the columns in the model
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
        data = request.get_json()
        print("Received data:", data)

        item_id = data.get('id')
        title = data.get('title')
        direction = data.get('direction')

        print(f"item_id: {item_id}, title: {title}, direction: {direction}")

        if model is not None:
            try:
                # Find the embedding row using 'new_column'
                embedding_row = model[model['new_column'] == item_id]
                print(f"Embedding row: {embedding_row}")  # Log the row found by id

                if not embedding_row.empty:
                    # Extract the embeddings (columns from 0 to 511)
                    embedding_values = embedding_row.iloc[0, :512].values
                    print(f"Embedding values: {embedding_values}")

                    # Calculate similarity scores (you'll need a defined function for this)
                    similarity_scores = model.iloc[:, :512].dot(embedding_values)  # Compute dot product as similarity

                    # Get the top 5 recommendations
                    top_recommendations = similarity_scores.nlargest(5).index
                    recommendation_images = model.loc[top_recommendations, 'link'].tolist()

                    prediction = {"recommendations": recommendation_images}
                else:
                    prediction = "No matching id found in the model."
            except Exception as e:
                print(f"Error finding embedding: {e}")
                return jsonify({"error": f"Error processing embedding: {str(e)}"}), 500

        return jsonify({"prediction": prediction})

    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"error": str(e)}), 500


# Running the server on localhost:5000
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
