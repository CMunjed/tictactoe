import time
from flask import Flask
import sklearn
import pickle
import numpy as np
import logging

# from flask_cors import CORS

# FRONT_END_URL = "https://tictactoe-seven-smoky.vercel.app/"

app = Flask(__name__)
# CORS(app, origins=[FRONT_END_URL])

# Load model
filename = "mlp-reg-multi.pkl"
try:
    model = pickle.load(open(filename, "rb"))
    app.logger.info("model loaded successfully")
except Exception as error:
    app.logger.info("error: model could not be loaded")
    app.logger.info(error)


@app.route("/api/time")
def get_current_time():
    return {"time": time.strftime("%H:%M:%S", time.localtime())}


@app.route("/api/predict/<board>")
def get_prediction(board):
    # Receive as string of x and o
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

    # index for single-label prediction model
    # prediction = int(np.around(model.predict([arr])[0], decimals=0))

    # prediction, consists of confidence values
    # for each
    pred = model.predict([game_board])[0]

    # sort prediction array in order of highest
    # confidence values
    pred_sorted = np.sort(pred)
    pred_sorted = pred_sorted[::-1]

    index = -1
    for j in range(len(pred_sorted)):
        # get index of highest confidence value
        l = np.where(pred == pred_sorted[j])
        # if that index is not played, serve that
        # index
        if game_board[int(l[0])] == 0:
            index = int(l[0])
            break

    # single-label
    # return {'prediction': prediction}

    return {"prediction": index}
