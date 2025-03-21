from flask import Flask, render_template

app = Flask(__name__, static_folder="static", template_folder="templates")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/resultados")
def resultados():
    return render_template("resultados.html")

@app.route("/como-esta-armado")
def como_esta_armado():
    return render_template("como-esta-armado.html")

@app.route("/conocer-mas")
def conocer_mas():
    return render_template("conocer-mas.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
