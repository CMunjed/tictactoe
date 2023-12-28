from flask import Flask, request
#import sklearn
import pickle
import numpy as np
#import logging
#from pydantic import BaseModel
from flask_cors import CORS
from model.model import model
from model.model import __version__ as model_version

FRONT_END_URL = "https://tictactoe-seven-smoky.vercel.app/"

app = Flask(__name__)
CORS(app, origins=[FRONT_END_URL, "http://localhost:5173"])


# To use and validate base models with routes, use Flask-Pydantic
#class BoardIn(BaseModel):
#    board: str

#class PredictionOut():
#    pred: int

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
