import os
import subprocess
from sentiment_helpers import ollama_query, generate_prompt, read_prompt_file

base_dir = os.path.abspath(os.path.join(os.getcwd()))
prompts_dir = os.path.join(base_dir, "RAG", "prompts")

prompt_file = os.path.join(prompts_dir, "sentiment.txt")
base_prompt = read_prompt_file(prompt_file)

user_prompt = input("Please enter your prompt: ")

prompt = generate_prompt(base_prompt, user_prompt)

response = ollama_query(prompt)

print(f"{response}")