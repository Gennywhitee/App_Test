from flask import Flask, jsonify, request
import time

app = Flask(__name__)


@app.route('/test')
def prova():
   return jsonify({"somma": "Ciao"})

@app.route('/server', methods=["POST"])
def calcola_somma():
   numero1 = request.json.get("x")
   numero2 = request.json.get("y")
   somma = numero1 + numero2
   print(somma)
   print("aspetto")
   time.sleep(5)
   print("fatto")
   return jsonify({"somma": somma})


if __name__ == "__main__":
   app.run()