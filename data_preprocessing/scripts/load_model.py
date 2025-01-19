from bertopic import BERTopic
import pandas as pd

loading_user_model = BERTopic.load('/Users/angus/Documents/Projects/Tranquilo/data_preprocessing/saved_models/user_BERT_model')
# loading_therapist_model = BERTopic.load('/Users/angus/Documents/Projects/Tranquilo/data_preprocessing/saved_models/therapist_BERT_model')

text_list = []
sample_text = "I'm going through some things with my feelings and myself. I barely sleep and I do nothing but think about how I'm worthless and how I shouldn't be here. I've never tried or contemplated suicide. I've always wanted to fix my issues, but I never get around to it. How can I change my feeling of being worthless to everyone?"
text_list.append(sample_text)

def predict_topic(model, new_text):

    predicted_topics = model.transform(new_text)
    return (f'Predicted Topic: {predicted_topics[0]}')

predicted_topic = predict_topic(loading_user_model, sample_text)
# therapist_probs = get_topic_proba(loading_therapist_model, sample_text)

print(predicted_topic)


