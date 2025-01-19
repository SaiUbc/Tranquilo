import pandas as pd
from tqdm import tqdm
import os

def main():
    # Define base directory relative to the script's location
    base_dir = os.path.abspath(os.path.join(os.getcwd()))
    data_dir = os.path.join(base_dir, "data_preprocessing", "data")
    processed_data_dir = os.path.join(data_dir, "processed_data")

    # File paths
    user_topics_file = os.path.join(processed_data_dir, "user_modelled_topics.csv")
    therapist_topics_file = os.path.join(processed_data_dir, "therapist_modelled_topics.csv")

    # Load data
    user_topics = pd.read_csv(user_topics_file)
    therapist_topics = pd.read_csv(therapist_topics_file)

    # Extract topic names
    user_topics_names = [[user_topics['Topic'][i], user_topics['topic_modelled'][i]] for i in range(len(user_topics))]
    therapist_topics_names = [[therapist_topics['Topic'][i], therapist_topics['topic_modelled'][i]] for i in range(len(therapist_topics))]

    # Output the topic names
    print("User Topics Names:", user_topics_names[:5])  # Example to show first 5 topics
    print("Therapist Topics Names:", therapist_topics_names[:5])  # Example to show first 5 topics

if __name__ == "__main__":
    main()
