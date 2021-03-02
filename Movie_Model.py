from flask import Flask, Response, request, render_template
from pymongo import MongoClient


app = Flask(__name__)


@app.errorhandler(Exception)
def server_error(err):
    app.logger.exception(err)
    return Response render_template("internal server error")

try:
    db = json.loads(open('./Data/db.json').read())
    uri = f"mongodb://localhost:5000"
    client = MongoClient(uri)
    db = client.Movie
    MyData = db.movie_doc    
except Exception as err:
    server_error(err)

@app.route('/insert')
def insert():
    try:
        movie = {
            'name' : request.form['name'],
            'img' : request.form['img'],
            'summary' : request.form['summary']
            'id' : request.form['id']
        }
        insert_query = MyData.insert_one(movie)
        if insert_query.inserted_id:        
            return render_template("value inserted sucessfully")
    except Exception as err:
        return server_error(err)


@app.route('/display',methods=['GET'])
def display():
    try:
        movie_doc = list(MyData.find())
        for item in movie_doc:
            item['_id'] = str(item['_id'])
        if len(movie_doc) == 0:
            return render_template("no data found")
    except Exception as err:
        return server_error(err)

@app.route('/update', methods = ['PUT'])
def update(id):
    try:
        update_query = MyData.find_one_and_update({'_id':(id)})
        if update_query == None:
            return render_template("no data found")
        return render_template({"record update sucessfully")       
    except Exception as err:
        return server_error(err)



app.route('/Delete', methods=['DELETE'])
def Delete(id):
    try:
        delete_query = MyData.find_one_and_delete({"id"})
        if delete_query == None:
            return render_template("no data found")
        return render_template({"record update sucessfully")
    except Exception as err:
        return server_error(err)



if __name__ == '__main__':
    app.run(debug=True)
