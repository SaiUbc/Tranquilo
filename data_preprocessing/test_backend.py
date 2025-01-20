from flask import Flask, request, jsonify
import requests
from pyngrok import ngrok
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

CORS(app)  # Enable CORS for all routes

# URLs and API keys for testing
FIRST_API_URL = "https://9d84-34-30-13-14.ngrok-free.app/predict"
SECOND_API_URL = "http://127.0.0.1:5000/rerank"
COHERE_API_URL = "https://d5bd-34-145-95-7.ngrok-free.app/invoke"
COHERE_API_KEY = "ucWqFhZQUTBshk778p4ejEKXhwC3Pnrswou2SF2U"

# Preprocessing function for prompt generation
def generate_prompt_for_RAG(user_input, sentiment, top_3_responses):
    top_3_responses_str = "\n".join(top_3_responses) if isinstance(top_3_responses, list) else str(top_3_responses)
    return (
        f"You are a World Famous Mental Health Advisor. Suppose a user has given you a PROMPT:\n\n"
        f"<PROMPT>: {user_input}\n\n"
        f"Based on this <PROMPT>, we also know the user's sentiment:\n\n"
        f"<SENTIMENT>: {sentiment}\n\n"
        f"Moreover, a trained Mental Health Professional has given the following <RESPONSES> in the past based on the user's <PROMPT>:\n\n"
        f"<TOP_3_RESPONSES>: {top_3_responses_str}\n\n"
        f"Generate a Response based on the <PROMPT>."
    )

# Step 1: Call the first API
def call_first_api(user_input):
    first_api_payload = {"sample_text": user_input}
    response = requests.post(FIRST_API_URL, json=first_api_payload)
    response.raise_for_status()
    return response.json()

# Step 2: Call the second API
def call_second_api(num, user_input):
    second_api_payload = {"input_str": user_input, "num": num, "rank": 3}
    response = requests.post(SECOND_API_URL, json=second_api_payload, headers={"Content-Type": "application/json"})
    response.raise_for_status()
    return response.json()

# Step 3: Call the Cohere API
def call_cohere_api(prompt):
    cohere_payload = {"model": "command-xlarge-nightly", "prompt": prompt, "max_tokens": 30}
    cohere_headers = {"Authorization": f"Bearer {COHERE_API_KEY}", "Content-Type": "application/json"}
    response = requests.post(COHERE_API_URL, json=cohere_payload, headers=cohere_headers)
    response.raise_for_status()
    return response.json()

# Endpoint to process user input
@app.route("/process", methods=["POST"])
def process_input():
    data = request.json
    user_input = data.get("user_input")

    if not user_input:
        return jsonify({"error": "user_input is required"}), 400

    try:
        # Step 1: First API call
        first_result = call_first_api(user_input)
        if "predicted_topic" in first_result:
            num_str = first_result["predicted_topic"].split("[")[1].split("]")[0]
            num = int(num_str)
            sentiment = first_result["predicted_topic"]

            # Step 2: Second API call
            top_3_responses = call_second_api(num, user_input)
            if isinstance(top_3_responses, list):
                # Step 3: Generate prompt and call Cohere API
                prompt = generate_prompt_for_RAG(user_input, sentiment, top_3_responses)
                cohere_result = call_cohere_api(prompt)
                cohere_text = cohere_result

                return jsonify({"final_response": cohere_text})
            else:
                return jsonify({"error": "Second API did not return a valid response"}), 500
        else:
            return jsonify({"error": "First API did not return a valid response"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run Flask app
if __name__ == "__main__":
    from pyngrok import ngrok
    ngrok.set_auth_token("2rrM0vYQOjcDwtPKMz4GVrfysbL_6fAN64gBUB7SCLBN27cCy")
# Expose FastAPI on a public URL using ngrok
    # public_url = ngrok.connect(8003)
    # print(f"Public URL: {public_url}")
    app.run(debug=True, port=8003)
    


# import requests
# # URLs for testing
# FIRST_API_URL = "https://6cc6-34-125-82-78.ngrok-free.app/predict"
# SECOND_API_URL = "http://127.0.0.1:5000/rerank"
# COHERE_API_URL = "https://6c45-34-105-34-238.ngrok-free.app/invoke"
# COHERE_API_KEY = "ucWqFhZQUTBshk778p4ejEKXhwC3Pnrswou2SF2U"

# # Step 3: Preprocessing function for prompt generation
# def generate_prompt_for_RAG(user_input, sentiment, top_3_responses):
#     """
#     Combines the base prompt template
    
#     Args:
#         user_input (str): User input prompt.
#         sentiment (str): Sentiment extracted from Step 1.
#         top_3_responses (list): Responses from Step 2.
    
#     Returns:
#         str: The combined prompt.
#     """
#     # Force convert `top_3_responses` into a string
#     top_3_responses_str = "\n".join(top_3_responses) if isinstance(top_3_responses, list) else str(top_3_responses)

#     return (
#         f"You are a World Famous Mental Health Advisor. Suppose a user has given you a PROMPT:\n\n"
#         f"<PROMPT>: {user_input}\n\n"
#         f"Based on this <PROMPT>, we also know the user's sentiment:\n\n" 
#         f"<SENTIMENT>: {sentiment}\n\n"
#         f"Moreover, a trained Mental Health Professional has given the following <RESPONSES> in the past based on the user's <PROMPT>:\n\n"
#         f"<TOP_3_RESPONSES>: {top_3_responses_str}\n\n"
#         f"Generate a Response based on the <PROMPT>."
#     )

# # Step 1: Call the first API
# def test_first_api():
#     user_input = "All my friend at UBC are getting internships except me and my parents say im useless!"
#     first_api_payload = {"sample_text": user_input}

#     try:
#         response = requests.post(FIRST_API_URL, json=first_api_payload)
#         response.raise_for_status()
#         first_result = response.json()
#         print("Step 1: First API Response:", first_result)

#         # Extract `num` from `predicted_topic` (e.g., 'Predicted Topic: [117]')
#         if "predicted_topic" in first_result:
#             # Extract the number inside the brackets
#             num_str = first_result["predicted_topic"].split("[")[1].split("]")[0]
#             num = int(num_str)  # Convert to integer
#             sentiment = first_result["predicted_topic"]  # Use as sentiment
#             return {"num": num, "sentiment": sentiment}
#         else:
#             print("Error: `predicted_topic` not found in response.")
#             return None
#     except Exception as e:
#         print("Error in Step 1:", e)
#         return None

# # Step 2: Call the second API
# def test_second_api(num, user_input):
#     second_api_payload = {
#         "input_str": user_input,
#         "num": num,
#         "rank": 3
#     }

#     try:
#         response = requests.post(SECOND_API_URL, json=second_api_payload, headers={"Content-Type": "application/json"})
#         response.raise_for_status()
#         second_result = response.json()
#         print("Step 2: Second API Response:", second_result)

#         # Ensure the response is a list
#         if isinstance(second_result, list):
#             return second_result  # Directly return the list of responses
#         else:
#             print("Error: Second API did not return a list.")
#             return None
#     except Exception as e:
#         print("Error in Step 2:", e)
#         return None

# # Step 3: Call the Cohere API
# def call_cohere_api(prompt):
#     cohere_payload = {
#         "model": "command-xlarge-nightly",
#         "prompt": prompt,
#         "max_tokens": 30  # Adjust based on your requirements
#     }
#     cohere_headers = {
#     "Authorization": f"Bearer {COHERE_API_KEY}",
#     "Content-Type": "application/json"
#     }

#     try:
#         response = requests.post(COHERE_API_URL, json=cohere_payload, headers=cohere_headers)
#         response.raise_for_status()
#         cohere_result = response.json()
#         print("Step 3: Cohere API Response:", cohere_result)
#         return cohere_result.get("generations", [{}])[0].get("text")
#     except Exception as e:
#         print("Error in Step 3:", e)
#         return None

# # Testing the pipeline
# if __name__ == "__main__":
#     # Step 1
#     first_api_result = test_first_api()
#     if first_api_result and "num" in first_api_result:
#         # Step 2
#         num = first_api_result["num"]
#         sentiment = first_api_result["sentiment"]
#         user_input = "How can I get to a place where I can be content from day to day?"
#         top_3_responses = test_second_api(num, user_input)

#         if top_3_responses:
#             # Step 3: Generate the prompt and call Cohere API
#             prompt = generate_prompt_for_RAG(user_input, sentiment, top_3_responses)
#             cohere_response = call_cohere_api(prompt)
#             print("Final Output:", cohere_response)
#         else:
#             print("Skipping Step 3 due to an error in Step 2.")
#     else:
#         print("Skipping Step 2 and 3 due to an error in Step 1.")
