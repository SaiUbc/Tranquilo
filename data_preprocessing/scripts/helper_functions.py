import ollama
import pandas as pd
import subprocess


def ollama_query(prompt, model="llama3.2"):
    """
    Runs an Ollama model with a given prompt using the CLI.
    """
    try:
        command = ["ollama", "run", model, prompt]
        result = subprocess.run(command, stdout=subprocess.PIPE, text=True)
        return result.stdout.strip()
    
    except Exception as e:
        print(f"Error running Ollama: {e}")
        return None
    
def generate_prompt(base_prompt, topic_theme, topic_words, topic_examples):
    """
    Combines the base prompt template with specific topic data.
    
    Args:
        base_prompt (str): The base prompt template.
        topic_theme (str): The topic theme.
        topic_words (str): The topic words.
        topic_examples (str): The example phrases.
    
    Returns:
        str: The combined prompt.
    """
    return (
        f"{base_prompt}\n\n"
        f"INPUT:\n\n"
        f"- <Topic Theme>: {topic_theme}\n"
        f"- <Topic Words>: {topic_words}\n"
        f"- <Example Phrases>: {topic_examples}\n\n"
        f"OUTPUT:"
    )

def read_prompt_file(file_path):
    try:
        with open(file_path, "r") as file:
            prompt = file.read().strip()
            return prompt
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        exit(1)
    except Exception as e:
        print(f"Error reading file: {e}")
        exit(1)

if __name__ == "__main__":
    file_path = "data_preprocessing/prompts/user_input_topic_modelling_prompt.txt"

    try:
        with open(file_path, "r") as file:
            prompt = file.read().strip()
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        exit(1)
    except Exception as e:
        print(f"Error reading file: {e}")
        exit(1)
    
    response = ollama_query("You are a helpful assistant trained to analyze mental health data and distill it into a concise, descriptive topic name. Given the following information about a topic theme, topic words, and example phrases, your task is to infer the most appropriate short topic name based on the core idea or theme of the text. You would be given user input phrases. An example for the format is:  INPUT: - Topic Theme: 0_address_history_many_issues - Topic Words: ['address', 'history', 'many', 'issues', 'counseling', '35', 'lifetime', 'insomniac', 'breast', 'happily'] - Example Phrases: ['I have so many issues to address. I have a history of sexual abuse, I’m a breast cancer survivor and I am a lifetime insomniac. I have a long history of depression and I’m beginning to have anxiety. I have low self esteem but I’ve been happily married for almost 35 years. I’ve never had counseling about any of this. Do I have too many issues to address in counseling?'] OUTPUT: multiple_past_issues Instructions: Based on the above example data INPUT and example OUTPUT, generate a single, concise topic name that captures the primary theme or idea behind the data. Do not include any additional explanation or context. Only return the topic name as the OUTPUT for the following: INPUT: - Topic Theme: -1_my_him_away_and - Topic Words: ['my', 'him', 'away', 'and', 'like', 'mom', 'love', 'would', 'the', 'boyfriend'] - Example Phrases: My fiancé and I have been in a relationship for two years. We have an infant son. My fiancé also has a child from a previous relationship. We do not live together. I live with my mother currently while I get on my feet, and he's living with some friends. My mother and I have an awful relationship that is completely unbearable most of the time. We cannot even stand to be around one another while living in the same house. She has made it clear that she wants me gone. Recently, I was talking to my father who lives in a different state. My father and I have always had a good relationship. I explained to him the situation I am in with my mother, and he said he would like for me, my fiancé, and our son to come live with him and his wife. I would really love to go. I do not want my son to be in this environment with constant arguing and negativity any longer. There is nowhere else for me to stay while remaining in this state. The problem is my fiancé is refusing to move away with me because he does not want to leave behind his other child. He and his child's mother have a horrible relationship, and she would absolutely not be willing to let him visit if we moved away. I believe I would be doing what is best for my child by moving away, but I do not want to leave without my fiancé. I have already explained the situation to him, and he will not give in. Do I continue to stay in this negative environment with my child and keep our family together? Do I move away with my child and have my relationship end? I do not want to take him out of either of his kids’ lives. What do I do? OUTPUT: (should be 3 to 4 words and generic)")
    print(f"Response: {response}")