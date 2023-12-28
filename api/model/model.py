import pickle
from pathlib import Path
#import re

__version__ = "1.0.0"

MODEL_NAME = "mlp-reg-multi"

BASE_DIR = Path(__file__).resolve(strict=True).parent

with open(f"{BASE_DIR}/{MODEL_NAME}-{__version__}.pkl", "rb") as f:
    model = pickle.load(f)

