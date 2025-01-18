import pandas as pd
from tqdm import tqdm

user_topics = pd.read_csv("/Users/saiubc/Desktop/Mental_Health/data_preprocessing/data/processed_data/user_modelled_topics.csv")
therapist_topics = pd.read_csv("/Users/saiubc/Desktop/Mental_Health/data_preprocessing/data/processed_data/therapist_modelled_topics.csv")

user_topics_names = [[user_topics['Topic'][i], user_topics['topic_modelled'][i]] for i in range(len(user_topics))]
therapist_topics_names = [[therapist_topics['Topic'][i], therapist_topics['topic_modelled'][i]] for i in range(len(therapist_topics))]

#TODO! add the topic names to processed_data.csv