from flask import Flask, request, jsonify
import sqlite3
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from pyngrok import ngrok

# Set ngrok auth token
ngrok.set_auth_token("2rqWhcZasNPENjiBYSLsHKIemIm_4ZorvnbMnMpTCGBTpCFtc")

app = Flask(__name__)

# Database setup
db_file = '/Users/angus/Documents/Projects/Tranquilo/data_preprocessing/database/database.db'

# Connect to SQLite database
conn = sqlite3.connect(db_file, check_same_thread=False)
cursor = conn.cursor()

table_name = 'processed_data'

# Function to get responses by user_topic
def get_response(num):
    responses = []
    query = f"SELECT * FROM {table_name} WHERE user_topic = ?"
    cursor.execute(query, (num,))
    rows = cursor.fetchall()
    for row in rows:
        responses.append(row[1])
    return responses

# Function to perform reranking
def reranking(input_str, num, rank=3):
    responses = get_response(num)

    if not responses:
        return []

    all_texts = [input_str] + responses

    # Reduce importance of filler words
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(all_texts)

    # Compute cosine similarity
    input_vector = tfidf_matrix[0]
    response_vectors = tfidf_matrix[1:]
    similarities = cosine_similarity(input_vector, response_vectors).flatten()

    # Create list of responses sorted by similarity
    similarity_dict = {responses[i]: similarities[i] for i in range(len(responses))}
    sorted_responses = [response for response, _ in sorted(similarity_dict.items(), key=lambda x: x[1], reverse=True)]

    return sorted_responses[:rank]

# Flask route to call reranking
@app.route('/rerank', methods=['POST'])
def rerank_endpoint():
    data = request.get_json()
    input_str = data.get('input_str')
    num = data.get('num')
    rank = data.get('rank', 3)

    if not input_str or num is None:
        return jsonify({"error": "Both 'input_str' and 'num' are required."}), 400

    try:
        result = reranking(input_str, num, rank)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Start Flask server
    port = 5000

    # Open ngrok tunnel
    http_tunnel = ngrok.connect(port, "http")
    print(f" * Public URL: {http_tunnel.public_url}")

    try:
        app.run(debug=True, port=port, use_reloader=False)
    finally:
        ngrok.disconnect(http_tunnel.public_url)  # Close the ngrok tunnel when the app stops
        ngrok.kill()  # Ensure all ngrok processes are terminated