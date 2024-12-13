from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
db = SQLAlchemy(app)

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    address = db.Column(db.String(200))
#Not sure if i actually need this here since i have a product.py file in the backend folder but i kept it incase
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.Text)
    price = db.Column(db.Float)

@app.route('/customers', methods=['GET', 'POST'])
def handle_customers():
    if request.method == 'POST':
        data = request.json
        new_customer = Customer(name=data['name'], email=data['email'], address=data['address'])
        db.session.add(new_customer)
        db.session.commit()
        return jsonify({'message': 'Customer created'}), 201
    customers = Customer.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'email': c.email} for c in customers])

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
