import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    # remove this code once you implement the database
    # return [{"title": "board1", "id": 1}, {"title": "board2", "id": 2}]

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):
    # remove this code once you implement the database
    # return [{"title": "title1", "id": 1}, {"title": "board2", "id": 2}]

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def get_all_username():
    all_usernames_dict = data_manager.execute_select(
        """
        SELECT username FROM users;
        """
    )
    all_username = []
    for name in all_usernames_dict:
        for value in name.values():
            all_username.append(value)
    return all_username


def add_new_user(username, password):
    data_manager.execute_update(
        """
        INSERT INTO users (username, password) 
        VALUES (%(username)s, %(password)s)
        """
        , {'username': username, 'password': password})


def get_all_user_data(username):
    all_data = data_manager.execute_select(
        """
        SELECT * FROM users
        WHERE username = %(username)s
        """
        , {'username': username})

    return all_data


def create_board(title):
    data_manager.execute_select("""INSERT INTO boards (title)
    VALUES (%(title)s) RETURNING title;
    """, {"title": title})


def rename_board(board_id, title):
    data_manager.execute_select(
        """
        UPDATE boards
        SET title = %(title)s
        WHERE id = %(board_id)s
        returning title
        """
        , {"title": title, "board_id": board_id})
