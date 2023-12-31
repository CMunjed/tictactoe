from flask import Flask, request, render_template
#import sklearn
import pickle
import numpy as np

import os
import sys

# Work-around for Vercel, add model to system path so it can be found
if os.environ.get('VERCEL') == '1':
    sys.path.append(os.path.dirname(__file__))

from model.model import model
from model.model import __version__ as model_version


build_path = '../dist'
app = Flask(__name__, static_folder=build_path, template_folder=build_path, static_url_path='/')


# To use and validate base models with routes, use Flask-Pydantic
#from pydantic import BaseModel
#from flask_cors import CORS
#class BoardIn(BaseModel):
#    board: str

#class PredictionOut():
#    pred: int


@app.route('/')
def index():
    if os.path.exists(build_path):
        return render_template('index.html')
    else:
        return {"error": "build not found, run 'npm run build' to serve front-end build from this route"}


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