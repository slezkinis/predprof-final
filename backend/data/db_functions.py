from data import db_session
from data.user import User


def new_user(email, password, first_name, last_name, is_admin=False):
    user = User()
    user.email = email
    user.set_password(password)
    user.first_name = first_name
    user.last_name = last_name
    user.is_admin = is_admin
    session = db_session.create_session()
    session.add(user)
    session.commit()
    return user
