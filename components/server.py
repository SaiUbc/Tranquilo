from flask import Flask, jsonify
import subprocess
import platform

app = Flask(__name__)

@app.route('/run-tos', methods=['GET'])
def run_tos():
    try:
        # Determine the operating system
        os_name = platform.system()

        # Command to open a new terminal and run `node tos.js`
        if os_name == "Windows":
            command = ["start", "cmd", "/k", "node tos.js"]
        elif os_name == "Darwin":  # macOS
            command = ["open", "-a", "Terminal", "node tos.js"]
        else:  # Assume Linux
            command = ["gnome-terminal", "--", "node", "tos.js"]

        # Execute the command
        subprocess.Popen(command, shell=(os_name == "Windows"))

        return jsonify({"message": "Command executed, check the terminal for output."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)