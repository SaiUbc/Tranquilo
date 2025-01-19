import subprocess
import ollama


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


def generate_prompt_for_RAG(user_input, sentiment, top_3_responses,):
    """
    Combines the base prompt template
    
    Args:
        base_prompt (str): The base prompt template.
        past_5_data (list): [date: , mood: , summary: ]]
    
    Returns:
        str: The combined prompt.
    """
    return (
        f"You are a World Famous Mental Health Advisor. Suppose a user has given you a PROMPT:\n\n"
        f"<PROMPT>: {user_input}\n\n"
        f"based on this <PROMPT> we also know a users sentiment:\n\n" 
        f"<SENTIMENT>: {sentiment}\n\n"
        f"Moreover, a trained Mental Health Professional has given the following <RESPONSES> in the past based on the user's <PROMPT>\n\n"
        f"<TOP_3_RESPONSES>: {top_3_responses}\n\n"
        f"Generate a Response based on the <PROMPT>>"
    )