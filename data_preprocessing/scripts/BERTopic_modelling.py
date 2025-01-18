import pandas as pd
from bertopic import BERTopic

data = pd.read_csv('/Users/saiubc/Desktop/Mental_Health/data_preprocessing/data/dataset.csv')
print('Loaded dataset!')

user_phrases = data.Context.to_list()
therapist_response = data.Response.to_list()
# llm_response = data.LLM.to_list()
print('converted data to list!')

#initialize BERTopic models
user_BERT_model = BERTopic(embedding_model="all-MiniLM-L6-v2")
therapist_BERT_model = BERTopic(embedding_model="all-MiniLM-L6-v2")
# llm_BERT_model = BERTopic(embedding_model="all-MiniLM-L6-v2")
print('initialized BERTopic models!')

#fit BERTopic models
user_topics, user_topics_prob = user_BERT_model.fit_transform(user_phrases)
print('finished fitting user_BERT_model')
therapist_topics, therapist_topics_prob = therapist_BERT_model.fit_transform(therapist_response)
print('finished fitting therapist_BERT_model')
# llm_topics, llm_topics_prob = llm_BERT_model.fit_transform(llm_response)
# print('finished fitting llm_BERT_model')


#save RAW topic_modelled datasets
user_topics_info = pd.DataFrame(user_BERT_model.get_topic_info())
user_topics_info.to_csv('/Users/saiubc/Desktop/Mental_Health/data_preprocessing/data/raw_data/user_topics_info.csv', index=False)

therapist_topic_info = pd.DataFrame(therapist_BERT_model.get_topic_info())
therapist_topic_info.to_csv('/Users/saiubc/Desktop/Mental_Health/data_preprocessing/data/raw_data/therapist_topics_info.csv', index=False)

# llm_topic_info = pd.DataFrame(llm_BERT_model.get_topic_info())
# llm_topic_info.to_csv('/Users/saiubc/Desktop/Mental_Health/data_preprocessing/data/raw_data/llm_topics_info.csv', index=False)

print('Saved datasets in data/raw_data folder! 👍🏻')

data['user_topic'] = user_topics
data['user_topic_prob'] = user_topics_prob
data['therapist_topic'] = therapist_topics
data['therapist_topic_prob'] = therapist_topics_prob

data.to_csv('/Users/saiubc/Desktop/Mental_Health/data_preprocessing/data/processed_data.csv', index=False)
print("Data Processing Complete! 🎉")

