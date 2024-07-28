from flask import Flask, render_template, request, jsonify
import json
import random

app = Flask(__name__)

def load_game(filename):
    with open(filename, 'r') as file:
        return json.load(file)

def save_game(filename, data):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_game_data')
def get_game_data():
    game_data = load_game('trivia_game.json')
    return jsonify(game_data)

@app.route('/submit_guess', methods=['POST'])
def submit_guess():
    data = request.json
    game_data = load_game('trivia_game.json')
    
    movie = game_data['movies'][data['movieIndex']]
    if data['guess'].lower() == movie['answer'].lower():
        response = {'result': 'correct'}
    else:
        response = {'result': 'incorrect'}
        movie['incorrectAttempts'] += 1
        movie['currentClueIndex'] += 1
        if movie['currentClueIndex'] == len(movie['clues']):
            response['answer'] = movie['answer']

    save_game('trivia_game.json', game_data)
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
