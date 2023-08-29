from flask import Flask, jsonify
from flask_cors import CORS
from scrape import scrape_stock

app = Flask(__name__)
CORS(app, resources={r"/scrape/*": {"origins": "*"}})  # Allow any origin

@app.route('/')
def index():
    return "Welcome to the Stock Scraper API!"

@app.route('/scrape/<ticker>')
def scrape(ticker):
    stock_data = scrape_stock(ticker)
    return jsonify(stock_data)

if __name__ == '__main__':
    app.run(debug=True)