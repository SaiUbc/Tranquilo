#!/bin/bash

# Activate Conda environment
source ~/miniconda3/etc/profile.d/conda.sh
conda activate ml_env

echo "Running BERTopic_modelling.py..."
python /Users/saiubc/Desktop/Mental_Health/data_preprocessing/scripts/BERTopic_modelling.py

echo "Running topic_modelling_user_prompts_script.py..."
python /Users/saiubc/Desktop/Mental_Health/data_preprocessing/scripts/topic_modelling_user_prompts_script.py

echo "Running topic_modelling_therapist_responses_script.py..."
python /Users/saiubc/Desktop/Mental_Health/data_preprocessing/scripts/topic_modelling_therapist_responses_script.py

echo "Running LLM_topic_name.py..."
python /Users/saiubc/Desktop/Mental_Health/data_preprocessing/scripts/LLM_topic_name.py

echo "All scripts executed successfully."
