import time
from flask import Flask

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    #print('route called')
    return {'time': time.strftime("%H:%M:%S", time.localtime())}