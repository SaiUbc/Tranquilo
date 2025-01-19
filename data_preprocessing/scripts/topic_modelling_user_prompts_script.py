from helper_functions import ollama_query, generate_prompt, read_prompt_file
import pandas as pd
from tqdm import tqdm
import os

def main():
    # Define base directory relative to the script's location
    base_dir = os.path.abspath(os.path.join(os.getcwd()))
    data_dir = os.path.join(base_dir, "data_preprocessing", "data")
    raw_data_dir = os.path.join(data_dir, "raw_data")
    processed_data_dir = os.path.join(data_dir, "processed_data")
    prompts_dir = os.path.join(base_dir, "data_preprocessing", "prompts")

    # Ensure necessary directories exist
    os.makedirs(raw_data_dir, exist_ok=True)
    os.makedirs(processed_data_dir, exist_ok=True)

    # File paths
    user_topics_file = os.path.join(raw_data_dir, "user_topics_info.csv")
    prompt_file = os.path.join(prompts_dir, "user_input_topic_modelling_prompt.txt")
    output_file = os.path.join(processed_data_dir, "user_modelled_topics.csv")

    # Load data and prompt
    user_topics_data = pd.read_csv(user_topics_file)
    base_prompt = read_prompt_file(prompt_file)

    # Initialize the 'topic_modelled' column
    user_topics_data['topic_modelled'] = ''

    # Process each row and generate topic modeling
    for i in tqdm(range(len(user_topics_data)), desc="Processing Rows"):
        try:
            if user_topics_data['Topic'][i] == -1:
                user_topics_data.at[i, 'topic_modelled'] = "personal"
                continue

            topic_theme = user_topics_data['Name'][i]
            topic_words = user_topics_data['Representation'][i]
            topic_examples = user_topics_data['Representative_Docs'][i][0]

            # Generate prompt and query response
            prompt = generate_prompt(base_prompt, topic_theme, topic_words, topic_examples)
            response = ollama_query(prompt)

            # Save the response to the dataset
            user_topics_data.at[i, 'topic_modelled'] = response
        except Exception as e:
            print(f"Error processing row {i}: {e}")

    # Save the updated dataset
    user_topics_data.to_csv(output_file, index=False)
    print(f"Updated dataset saved to '{output_file}'")

if __name__ == "__main__":
    main()
