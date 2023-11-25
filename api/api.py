import time
from flask import Flask
import sklearn
import pickle
import numpy as np
import logging


app = Flask(__name__)

#Load model
filename = 'mlp-clf.pkl'
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
    arr = [0]*9
    count = 0
    for c in str(board):
        if c == 'X':
            arr[count] = 1
        elif c == 'O':
            arr[count] = -1
        else:
            arr[count] = 0
        count+=1

    prediction = int(np.around(model.predict([arr])[0], decimals=0))
    
    return {'prediction': prediction}
