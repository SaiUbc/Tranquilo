import os
import sys

# Add the scripts directory to the Python path
script_dir = os.path.abspath(os.path.join(os.getcwd(), "data_preprocessing", "scripts"))
sys.path.append(script_dir)

# Import the scripts as modules
import scripts.BERTopic_modelling
import scripts.topic_modelling_user_prompts_script
import scripts.topic_modelling_therapist_responses_script
import scripts.LLM_topic_name

def main():
    print("Starting to run scripts in sequence...\n")

    print("Running BERTopic_modelling.py...")
    scripts.BERTopic_modelling.main()
    print("Finished BERTopic_modelling.py.\n")


    print("Running topic_modelling_user_prompts_script.py...")
    scripts.topic_modelling_user_prompts_script.main()
    print("Finished topic_modelling_user_prompts_script.py.\n")

    # Run topic_modelling_therapist_responses_script.py
    print("Running topic_modelling_therapist_responses_script.py...")
    scripts.topic_modelling_therapist_responses_script.main()
    print("Finished topic_modelling_therapist_responses_script.py.\n")

    print("All scripts executed successfully.")
    

if __name__ == "__main__":
    main()
