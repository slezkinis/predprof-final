from flask import Flask, render_template, redirect, request
from data import db_session
from data.user import User
from forms.register import RegisterForm
from forms.login import LoginForm
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from data.db_functions import new_user

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret_key"
login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    db_sess = db_session.create_session()
    return db_sess.query(User).get(user_id)


@app.route("/", methods=["GET", "POST"])
def main_page():
    if request.method == "POST":
        file = request.files["file"]
        return render_template("main.html", result="100")
    return render_template("main.html")


@app.route("/register", methods=["GET", "POST"])
@login_required
def register():
    if not current_user.is_admin:
        return redirect("/")
    form = RegisterForm()
    if form.validate_on_submit():
        if form.password.data != form.password_again.data:
            return render_template("register.html", form=form, message="Пароли не совпадают")
        db_sess = db_session.create_session()
        if db_sess.query(User).filter(User.email == form.email.data).first():
            return render_template("register.html", form=form, message="Указанная почта занята")

        user = new_user(form.email.data, form.password.data, form.first_name.data, form.last_name.data)

        db_sess.add(user)
        login_user(user)
        return redirect("/")
    return render_template("register.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        db_sess = db_session.create_session()
        user = db_sess.query(User).filter(User.email == form.email.data).first()
        if user:
            login_user(user)
            return redirect("/")
        return render_template("login.html", message="Неправильный логин или пароль", form=form)
    return render_template("login.html", form=form)


@app.route("/account")
@login_required
def account():
    return render_template("account.html", user=current_user)


@app.route("/account/leave")
@login_required
def leave_account():
    logout_user()
    return redirect("/")


db_session.global_init("db/db.db")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8888, debug=False)
