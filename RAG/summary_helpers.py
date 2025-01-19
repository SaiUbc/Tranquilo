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


def generate_prompt(base_prompt, user_input):
    """
    Combines the base prompt template
    
    Args:
        base_prompt (str): The base prompt template.
    
    Returns:
        str: The combined prompt.
    """
    return (
        f"{base_prompt}\n\n"
        f"<USER>:\n\n"
        f"{user_input}\n"
        f"<OUTPUT>\n"
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