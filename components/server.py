from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

@app.route('/run-tos', methods=['GET'])
def run_tos():
    try:
        # Run the Node.js command
        result = subprocess.run(['node', 'tos.js'], capture_output=True, text=True)

        # Check for errors
        if result.returncode != 0:
            return jsonify({"error": result.stderr}), 500

        # Return the output of the command
        return jsonify({"output": result.stdout})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3002)