import sqlite3
import pandas as pd

#Load the database
db_file = '/Users/angus/Documents/Projects/Tranquilo/data_preprocessing/database/time_series_database.db'
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

#Create the table
table_name = 'time_series_data'
create_table_query = f"""
CREATE TABLE IF NOT EXISTS {table_name} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    mood TEXT NOT NULL,
    topic_name FLOAT NOT NULL,
    summary TEXT NOT NULL
);
"""
cursor.execute(create_table_query)
conn.commit()

# Clear the table
cursor.execute(f"DELETE FROM {table_name};")
conn.commit()

# Reset the id count
cursor.execute(f"DELETE FROM sqlite_sequence WHERE name='{table_name}';")
conn.commit()


def insert_data(conn, data):
    cursor = conn.cursor()
    for mood, topic_name, summary in data:
        # Check if the row already exists
        query = f"""
        SELECT COUNT(*) FROM {table_name}
        WHERE summary = ?
        """
        cursor.execute(query, (summary,))
        count = cursor.fetchone()[0]
        
        # Insert only if the row does not exist
        if count == 0:
            insert_query = f"""
            INSERT INTO {table_name} (mood, topic_name, summary)
            VALUES (?, ?, ?)
            """
            cursor.execute(insert_query, (mood, topic_name, summary))
    conn.commit()

#Query all data
def query_data(conn):
    cursor = conn.cursor()
    query = f"""
    SELECT * FROM {table_name}
    ORDER BY date ASC
    """
    cursor.execute(query)
    return cursor.fetchall()

new_data = [
    ("happy", 1, "Feeling great!"),
    ("neutral", 2, "An average day."),
    ("sad", 3, "Not the best day."),
]
insert_data(conn, new_data)

results = query_data(conn)

#TESTING
# Print all queried data 
# print("Queried Data:")
# for row in results:
#     print(row)

# print(len(results))


def last_n_elements(n):
    query = f"""
    SELECT * FROM {table_name}
    ORDER BY id DESC
    LIMIT {n}
    """
    cursor.execute(query)
    return cursor.fetchall()

#TESTING
# last_1_row = last_n_elements(1)
# print("Last 1 Rows:")
# for row in last_1_row:
#     print(row)

conn.close()
