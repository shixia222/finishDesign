from flask import Flask

app = Flask(__name__)

@app.route("/posture")
def hello_world():
    return "<p>Hello, World!</p>"