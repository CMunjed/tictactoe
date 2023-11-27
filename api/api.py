import time
from flask import Flask
import sklearn
import pickle
import numpy as np
import logging


app = Flask(__name__)

#Load model
filename = 'mlp-reg-multi.pkl'
try:
    model = pickle.load(open(filename, 'rb'))
    #print('model loaded')
    app.logger.info('model loaded successfully')
except Exception as error:
    #print('model could not be loaded')
    app.logger.info('error: model could not be loaded')
    app.logger.info(error)


@app.route('/api/time')
def get_current_time():
    #print('route called')
    return {'time': time.strftime("%H:%M:%S", time.localtime())}

@app.route('/api/predict/<board>')
def get_prediction(board):
    #app.logger.info(str(board))

    #Receive as string of x and o
    game_board = [0]*9
    i = 0
    for c in str(board):
        if c == 'X':
            game_board[i] = 1
        elif c == 'O':
            game_board[i] = -1
        else:
            game_board[i] = 0
        i+=1

    # index for single-label prediction model
    #prediction = int(np.around(model.predict([arr])[0], decimals=0))
    
    # prediction, consists of confidence values
    # for each 
    pred = model.predict([game_board])[0]

    # sort prediction array in order of highest
    # confidence values
    pred_sorted = np.sort(pred)
    pred_sorted = pred_sorted[::-1]
    #app.logger.info("pred: ", pred)
    #app.logger.info("sorted: ", pred_sorted)

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
    #return {'prediction': prediction}

    return {'prediction': index}
