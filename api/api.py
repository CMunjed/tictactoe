from flask import Flask, request, render_template
#import sklearn
import pickle
import numpy as np
#import logging
#from pydantic import BaseModel
#from flask_cors import CORS

#from pathlib import Path
import os
import sys
#import imp

#BASE_DIR = Path(__file__).resolve(strict=True).parent
#model_path = os.path.join(BASE_DIR, 'model', 'model.py')
#m = imp.load_source("model", model_path)
#model = m.model
#model_version = imp.load_source("__version__", model_path)

# Work-around for Vercel, add model's path to system path
if os.environ.get('VERCEL') == '1':
    sys.path.append(os.path.dirname(__file__))

from model.model import model
from model.model import __version__ as model_version

print(os.listdir(os.getcwd()))

#FRONT_END_URL = "https://tictactoe-seven-smoky.vercel.app/"

#p = os.path.join('..', os.path.basename(os.getcwd()))
#p = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'dist')
#print(p)

#if os.environ.get('VERCEL') == '1':
#    app = Flask(__name__, static_folder=p, template_folder=p, static_url_path='/')
##else:
app = Flask(__name__, static_folder='../dist', template_folder='../dist', static_url_path='/')
#app = Flask(__name__)
#CORS(app, origins=[FRONT_END_URL, "http://localhost:5173"])

# To use and validate base models with routes, use Flask-Pydantic
#class BoardIn(BaseModel):
#    board: str

#class PredictionOut():
#    pred: int


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/api/status")
def get_test():
    return {"status": "OK", "model_version": model_version}


@app.route("/api/predict", methods = ['POST'])
def get_best_prediction():
    # Receive as string of x and o

    board = request.json['board']
    # Verify json body?

    game_board = [0] * 9
    i = 0
    for c in str(board):
        if c == "X":
            game_board[i] = 1
        elif c == "O":
            game_board[i] = -1
        else:
            game_board[i] = 0
        i += 1

    # prediction, consists of confidence values for each position
    pred = model.predict([game_board])[0]

    # sort prediction array in order of highest confidence values
    pred_sorted = np.sort(pred)
    pred_sorted = pred_sorted[::-1]

    index = -1
    for j in range(len(pred_sorted)):
        # get index of highest confidence value
        l = np.where(pred == pred_sorted[j])
        # if that index is not played, serve that index
        if game_board[int(l[0])] == 0:
            index = int(l[0])
            break

    return {"prediction": index}


if __name__ == '__main__':
    app.run()