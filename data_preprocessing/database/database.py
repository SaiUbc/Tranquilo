import sqlite3
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

csv_file = '/Users/angus/Documents/Projects/Tranquilo/data_preprocessing/data/processed_data.csv'
db_file = 'processed_data.db'

df = pd.read_csv(csv_file)

# connect to db
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

#convert df to sqlite table
table_name = 'processed_data'
df.to_sql(table_name, conn, if_exists='replace', index=False)

#sort table by user_topic
query = f"SELECT * FROM {table_name} ORDER by user_topic ASC"
cursor.execute(query)

#TODO: update database after sorting unless it sorts in place

rows = cursor.fetchall()

print(f"user_topic: {rows[249][3]}")

# get response by user_topic
def get_response(num):
    responses = []
    query = f"SELECT * FROM {table_name} WHERE user_topic = {num}"
    cursor.execute(query)
    rows = cursor.fetchall()
    for row in rows:
        responses.append(row[1])

    return responses


def reranking(input_str, num):
    responses = get_response(num)

    all_texts = [input_str] + responses

    #Reduce importance of filler words e.g is, the
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(all_texts)

    #Compute cosine similarity
    input_vector = tfidf_matrix[0]
    response_vectors = tfidf_matrix[1:]
    similarities = cosine_similarity(input_vector, response_vectors).flatten()

    #create dict mapping responses to similarity scores
    similarity_dict = {responses[i]: similarities[i] for i in range(len(responses))}
    sorted_similarity_dict = dict(sorted(similarity_dict.items(), key=lambda x: x[1], reverse=True))
    
    print(sorted_similarity_dict.values())
    return sorted_similarity_dict

reranking("Is being friends with this person safe for you?Liars don't generally distinguish who they bring down with them or in service", 145)

conn.close()



