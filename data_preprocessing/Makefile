# Define the Python interpreter
PYTHON := conda run -n ml_env python

# Targets
all: run_all

run_all: bert_topic_modelling topic_modelling_user_prompts topic_modelling_therapist_responses llm_topic_name
	@echo "All scripts executed successfully."

bert_topic_modelling:
	echo "Running BERTopic_modelling.py..."
	$(PYTHON) BERTopic_modelling.py

topic_modelling_user_prompts:
	@echo "Running topic_modelling_user_prompts_script.py..."
	$(PYTHON) topic_modelling_user_prompts_script.py

topic_modelling_therapist_responses:
	@echo "Running topic_modelling_therapist_responses_script.py..."
	$(PYTHON) topic_modelling_therapist_responses_script.py

llm_topic_name:
	@echo "Running LLM_topic_name.py..."
	$(PYTHON) LLM_topic_name.py

clean:
	@echo "Cleaning up temporary files and CSVs..."
	rm -f *.pyc
	rm -rf __pycache__
	rm -f data_preprocessing/data/raw_data/*.csv
	rm -f data_preprocessing/data/processed_data/*.csv
	rm -f data_preprocessing/data/processed_data.csv