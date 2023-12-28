#import time
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

#logging.basicConfig(level=logging.DEBUG)
#app.logger.info('test')

# Load model
#filename = "mlp-reg-multi.pkl"
#try:
#    model = pickle.load(open(filename, "rb"))
#    #app.logger.info("model loaded successfully")
#except Exception as error:
#    pass   # do nothing
    #app.logger.info("error: model could not be loaded")
    #app.logger.info(error)


#@app.route("/api/time")
#def get_current_time():
#    return {"time": time.strftime("%H:%M:%S", time.localtime())}


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

    #app.logger.info(request.json)
    #app.logger.info(request.json['board'])

    board = request.json['board']
    #if board == "":
    #    return{"Error": None}

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
