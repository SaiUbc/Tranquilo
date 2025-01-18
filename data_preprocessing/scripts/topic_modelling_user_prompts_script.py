from helper_functions import ollama_query, generate_prompt, read_prompt_file
import pandas as pd
from tqdm import tqdm

user_topics_data = pd.read_csv("/Users/saiubc/Desktop/Mental_Health/data_preprocessing/data/raw_data/user_topics_info.csv")

base_prompt = read_prompt_file("/Users/saiubc/Desktop/Mental_Health/data_preprocessing/prompts/user_input_topic_modelling_prompt.txt")

user_topics_data['topic_modelled'] = ''

for i in tqdm(range(len(user_topics_data)), desc="Processing Rows"):
    try:
        if (user_topics_data['Topic'][i] == -1):
            user_topics_data.at[i, 'topic_modelled'] = "personal"

        topic_theme = user_topics_data['Name'][i]
        topic_words = user_topics_data['Representation'][i]
        topic_examples = user_topics_data['Representative_Docs'][i][0] 

        prompt = generate_prompt(base_prompt, topic_theme, topic_words, topic_examples)

        response = ollama_query(prompt)

        user_topics_data.at[i, 'topic_modelled'] = response
    except Exception as e:
        print(f"Error processing row {i}: {e}")


user_topics_data.to_csv("/Users/saiubc/Desktop/Mental_Health/data_preprocessing/data/processed_data/user_modelled_topics.csv", index=False)
print("Updated dataset saved to 'data/processed_data/user_modelled_topics.csv'")



