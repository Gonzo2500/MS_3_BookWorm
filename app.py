import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env

app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


@app.route("/")
@app.route("/home")
def home():
    # Check if there is a user in session
    if "user" in session:
        user = mongo.db.users.find_one(
            {"username": session["user"]})["username"]
        return render_template(
            "home.html", user=user)
    else:
        return render_template("home.html")


@app.route("/sign_up", methods=["GET", "POST"])
def sign_up():
    if request.method == 'POST':
        # check if the username already exists
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            flash("Username already taken")
            return redirect(url_for("sign_up"))

        sign_up = {
            "username": request.form.get("username").lower(),
            "password": generate_password_hash(request.form.get("password"))
        }
        mongo.db.users.insert_one(sign_up)

        # session cookie for the new user
        session["user"] = request.form.get("username").lower()
        flash("Hi, {}. Welcome to BookWorm.".format(
                        request.form.get("username").capitalize()))
        flash("Click on the add button and create your first book review")
        return redirect(url_for(
            "profile", username=session["user"]))
    return render_template("sign_up.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # check if username already exists
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            # ensure hashed password equals the user input
            if check_password_hash(
                    existing_user["password"], request.form.get("password")):
                session["user"] = request.form.get("username").lower()
                return redirect(url_for(
                    "profile", username=session["user"]))
            else:
                # flash message for incorrect password
                flash("Incorrect Username or Password, please try again")
                return render_template("login.html")

        else:
            # username does not exist
            flash("Username does not exist")
            return render_template("login.html")

    return render_template("login.html")


@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    # get the session user's username from database
    username = mongo.db.users.find_one(
        {"username": session["user"]})["username"]
    # get the session user's books from database
    books = list(mongo.db.Books.find())

    if session["user"]:
        return render_template(
            "profile.html", username=username, books=books)

    return redirect(url_for("login"))


@app.route("/book_add", methods=["GET", "POST"])
def book_add():
    if request.method == "POST":
        book = {
            "book_name": request.form.get("book_name"),
            "book_author": request.form.get("book_author"),
            "img_url": request.form.get("img_url"),
            "book_review": request.form.get("book_review"),
            "created_by": session["user"]
        }
        mongo.db.Books.insert_one(book)
        return redirect("/profile/<username>")


@app.route("/view_book/<book_name>")
def view_book(book_name):
    book = mongo.db.Books.find_one({"_id": ObjectId(book_name)})
    return render_template("view_book.html", book=book)


@app.route("/edit_book/<book_id>", methods=["GET", "POST"])
def edit_book(book_id):
    if request.method == "POST":
        edited_book = {
            "book_name": request.form.get("book_name"),
            "book_author": request.form.get("book_author"),
            "img_url": request.form.get("img_url"),
            "book_review": request.form.get("book_review"),
            "created_by": session["user"]
        }
        mongo.db.Books.update({"_id": ObjectId(book_id)}, edited_book)

    book = mongo.db.Books.find_one({"_id": ObjectId(book_id)})
    return render_template("view_book.html", book=book)


@app.route("/delete_book/<book_id>")
def delete_book(book_id):
    mongo.db.Books.remove({"_id": ObjectId(book_id)})
    flash("Book succesfully deleted.")
    return redirect("/profile/<username>") 


@app.route("/log_out")
def log_out():
    session.pop("user")
    return redirect(url_for("home"))


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)