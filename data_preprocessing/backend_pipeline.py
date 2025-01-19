from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Replace with actual API URLs
FIRST_API_URL = "https://6cc6-34-125-82-78.ngrok-free.app/predict"
SECOND_API_URL = "http://127.0.0.1:5000"
COHERE_API_URL = "https://api.cohere.ai/generate"
COHERE_API_KEY = "2rqWhcZasNPENjiBYSLsHKIemIm_4ZorvnbMnMpTCGBTpCFtc"

@app.route('/api/process', methods=['POST'])
def process_request():
    try:
        # Step 1: Get user_input from the frontend request
        data = request.json
        user_input = data.get("user_input")
        if not user_input:
            return jsonify({"error": "Missing user_input"}), 400

        # Step 2: Call the first API
        first_api_payload = {"sample_text": user_input}
        first_response = requests.post(FIRST_API_URL, json=first_api_payload)
        if first_response.status_code != 200:
            return jsonify({"error": "Error calling first API", "details": first_response.text}), 500
        first_api_result = first_response.json()

        # Assume the `num` is derived from the first API response
        num = first_api_result.get("num", 1)  # Default to 1 if not provided

        # Step 3: Call the second API
        second_api_payload = {
            "input_str": user_input,
            "num": num,
            "rank": 3
        }
        second_response = requests.post(SECOND_API_URL, json=second_api_payload, headers={"Content-Type": "application/json"})
        if second_response.status_code != 200:
            return jsonify({"error": "Error calling second API", "details": second_response.text}), 500
        second_api_result = second_response.json()

        # # Step 4: Call the Cohere API
        # cohere_payload = {
        #     "model": "command-xlarge-nightly",  # Replace with your model
        #     "prompt": f"Input: {user_input}, Num: {num}, Responses: {second_api_result}",
        #     "max_tokens": 100  # Adjust as needed
        # }
        # cohere_headers = {
        #     "Authorization": f"Bearer {COHERE_API_KEY}",
        #     "Content-Type": "application/json"
        # }
        # cohere_response = requests.post(COHERE_API_URL, json=cohere_payload, headers=cohere_headers)
        # if cohere_response.status_code != 200:
        #     return jsonify({"error": "Error calling Cohere API", "details": cohere_response.text}), 500
        # cohere_output = cohere_response.json().get("generations", [{}])[0].get("text")

        # Step 5: Return the combined response to the frontend
        return jsonify({
            "user_input": user_input,
            "num": num,
            "responses": second_api_result
        })

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=8000)