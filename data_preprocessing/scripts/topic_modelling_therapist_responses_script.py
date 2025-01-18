from helper_functions import ollama_query, generate_prompt, read_prompt_file
import pandas as pd
from tqdm import tqdm

therapist_topics_data = pd.read_csv("/Users/saiubc/Desktop/Mental_Health/data_preprocessing/data/raw_data/therapist_topics_info.csv")

base_prompt = read_prompt_file("/Users/saiubc/Desktop/Mental_Health/data_preprocessing/prompts/therapist_response_topic_modelling_prompt.txt")

therapist_topics_data['topic_modelled'] = ''

for i in tqdm(range(len(therapist_topics_data)), desc="Processing Rows"):
    try:
        if (therapist_topics_data['Topic'][i] == -1):
            therapist_topics_data.at[i, 'topic_modelled'] = "personal"

        topic_theme = therapist_topics_data['Name'][i]
        topic_words = therapist_topics_data['Representation'][i]
        topic_examples = therapist_topics_data['Representative_Docs'][i][0] 

        prompt = generate_prompt(base_prompt, topic_theme, topic_words, topic_examples)

        response = ollama_query(prompt)

        therapist_topics_data.at[i, 'topic_modelled'] = response
    except Exception as e:
        print(f"Error processing row {i}: {e}")


therapist_topics_data.to_csv("/Users/saiubc/Desktop/Mental_Health/data_preprocessing/data/processed_data/therapist_modelled_topics.csv", index=False)
print('Updated dataset saved to "data/processed_data/therapist_modelled_topics.csv"')