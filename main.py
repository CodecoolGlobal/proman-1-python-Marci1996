from flask import Flask, render_template, url_for, session, redirect, request
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries
import bcrypt

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()
app.secret_key = 'nellyqueen'


def is_logged_in():
    if 'username' in session:
        return True
    else:
        return False


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


@app.route('/register')
def register():
    if is_logged_in():
        return redirect(url_for('index'))
    else:
        return render_template('register.html')


@app.route('/register', methods=['POST'])
def register_post():
    username = request.form.get('username')
    password = request.form.get('password')
    all_username = queries.get_all_username()
    if username in all_username:
        return redirect(url_for('register'))
    else:
        hashed_password = hash_password(password)
        queries.add_new_user(username, hashed_password)
        return redirect(url_for('login'))


@app.route('/login')
def login():
    if is_logged_in():
        return redirect(url_for('index'))
    else:
        return render_template('login.html')


@app.route('/login', methods=['POST'])
def login_post():
    username = request.form.get('username')
    password = request.form.get('password')
    all_username = queries.get_all_username()
    if username in all_username:
        user_data = queries.get_all_user_data(username)
        if verify_password(password, user_data[0]['password']):
            session['username'] = username
            session['id'] = user_data[0]['id']
            return redirect(url_for('index'))
        else:
            return redirect(url_for('login'))
    else:
        return redirect(url_for('login'))


@app.route('/logout')
def logout():
    if is_logged_in():
        session.clear()
        return redirect(url_for('index'))
    else:
        return redirect(url_for('login_get'))


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    logged_in = is_logged_in()
    return render_template('index.html', logged_in=logged_in)


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route("/api/createBoard", methods=["GET", "POST"])
@json_response
def create_new_board():
    board_title = request.get_json()
    if board_title:
        return queries.create_board(board_title["title"])


@app.route('/api/delete/<int:card_id>', methods=['DELETE'])
@json_response
def delete_card(card_id):
    return queries.delete_card(card_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
