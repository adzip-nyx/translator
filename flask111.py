from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return '<html><body>Boo!</body></html>'

app.run(debug=True, port=8080)
