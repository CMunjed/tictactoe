# tictactoe

A simple tic-tac-toe web application with 2-player and AI gamemodes.

## Description

This web application, constructed with React, Vite, and Flask, allows the user to play tic-tac-toe against a friend or against AI. 

<!-- Picture here -->
<!--  [![Product Name Screen Shot][product-screenshot]](https://example.com)  -->
![Screenshot](https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/images/screenshot.png)

### The AI

The AI is a multi-layer perceptron neural network made with scikit-learn.<!-- that performs multilabel classification or regression? on a provided tictactoe board. The board is represented as an array of 9 elements consisting of 0s and 1s, and the output similarly consists of 9 elements, with values representing the model's "confidence" in each position. The model is trained on a dataset of around 6500 tic-tac-toe games. --> <!--  The jupyter notebook file in which the model was trained, the training dataset, and the model's pickle file can be found in {directory}. --> <!-- The model was found to be around 99% accurate when using cross-validation and measured using a custom scoring function that takes the highest confidence value that has not yet been played and comparing it to the best plays for that board configuration in the dataset. -->

### Built With

[![React][React.js]][React-url]
[![Vite][Vite]][Vite-url]
[![Flask][Flask]][Flask-url]
[![scikit-learn][Sklearn]][Sklearn-url]

## Getting Started

### Prerequisites

* npm

  ```sh
  npm install npm@latest -g
  ```
* python


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. 

### How to Run

1. 

## Roadmap

- [ ] Finish roadmap
- [ ] Finish readme
- [ ] Add option to switch gamemodes
- [ ] Add difficulty levels
- [ ] Deploy

<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Sklearn]: https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white
[Sklearn-url]: https://scikit-learn.org/stable/
[Flask]: https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
