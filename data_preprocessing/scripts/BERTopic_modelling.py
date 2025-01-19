import pandas as pd
from bertopic import BERTopic
import os


base_dir = os.path.abspath(os.path.join(os.getcwd()))
data_dir = os.path.join(base_dir, "data_preprocessing", "data")
model_dir = os.path.join(base_dir, "saved_models")
raw_data_dir = os.path.join(data_dir, "raw_data")
processed_data_dir = data_dir

print(base_dir)


os.makedirs(raw_data_dir, exist_ok=True)

# Load dataset
data_file = os.path.join(data_dir, "dataset.csv")
if not os.path.exists(data_file):
    raise FileNotFoundError(f"The dataset file does not exist at {data_file}. Please check the path.")

data = pd.read_csv(data_file)
print("Loaded dataset!")

# Convert columns to lists
user_phrases = data.Context.to_list()
therapist_response = data.Response.to_list()
# llm_response = data.LLM.to_list()
print("Converted data to list!")

# Initialize BERTopic models
user_BERT_model = BERTopic(embedding_model="all-MiniLM-L6-v2")
therapist_BERT_model = BERTopic(embedding_model="all-MiniLM-L6-v2")
# llm_BERT_model = BERTopic(embedding_model="all-MiniLM-L6-v2")
print("Initialized BERTopic models!")

# Fit BERTopic models
user_topics, user_topics_prob = user_BERT_model.fit_transform(user_phrases)
print("Finished fitting user_BERT_model")
therapist_topics, therapist_topics_prob = therapist_BERT_model.fit_transform(therapist_response)
print("Finished fitting therapist_BERT_model")

# Save raw topic-modeled datasets
user_topics_info = pd.DataFrame(user_BERT_model.get_topic_info())
user_topics_info_file = os.path.join(raw_data_dir, "user_topics_info.csv")
user_topics_info.to_csv(user_topics_info_file, index=False)

therapist_topic_info = pd.DataFrame(therapist_BERT_model.get_topic_info())
therapist_topic_info_file = os.path.join(raw_data_dir, "therapist_topics_info.csv")
therapist_topic_info.to_csv(therapist_topic_info_file, index=False)

print("Saved datasets in data/raw_data folder! 👍🏻")

# Add topics and probabilities to the original dataset
data["user_topic"] = user_topics
data["user_topic_prob"] = user_topics_prob
data["therapist_topic"] = therapist_topics
data["therapist_topic_prob"] = therapist_topics_prob

# saving the trained BERTopic Model
user_save_path = os.path.join(model_dir, "user_BERT_model")
user_BERT_model.save(user_save_path, serialization="safetensors", save_ctfidf=True, save_embedding_model=user_BERT_model)
print('saved models in saved_models folder! 🎉')

# Save processed data
processed_data_file = os.path.join(processed_data_dir, "processed_data.csv")
data.to_csv(processed_data_file, index=False)
print("Data Processing Complete! 🎉")
