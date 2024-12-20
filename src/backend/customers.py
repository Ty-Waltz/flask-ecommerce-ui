from flask import Flask, jsonify, request
from flask_restx import Api, Resource, fields
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Ty222193!@localhost:3308/Ecommerce_UI'
db = SQLAlchemy(app)

api = Api(app, version="1.0", title="E-Commerce API", description="API for E-Commerce Application")

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.Text)
    price = db.Column(db.Float)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer)
    total = db.Column(db.Float)
    status = db.Column(db.String(50))

order_model = api.model('Order', {
    'id': fields.Integer(required=True, description='Order ID'),
    'customer_id': fields.Integer(required=True, description='Customer ID'),
    'total': fields.Float(required=True, description='Total Order Price'),
    'status': fields.String(required=True, description='Order Status')
})

product_model = api.model('Product', {
    'id': fields.Integer(required=True, description='Product ID'),
    'name': fields.String(required=True, description='Product Name'),
    'description': fields.String(required=True, description='Product Description'),
    'price': fields.Float(required=True, description='Product Price')
})

@api.route('/orders')
class OrderList(Resource):
    @api.doc('Get a list of orders')
    @api.marshal_list_with(order_model)
    def get(self):
        orders = Order.query.all()
        return orders

    @api.doc('Create a new order')
    @api.expect(order_model)
    def post(self):
        data = request.json
        new_order = Order(
            customer_id=data["customer_id"],
            total=data["total"],
            status=data["status"]
        )
        db.session.add(new_order)
        db.session.commit()
        return jsonify(new_order), 201

@api.route('/products')
class ProductList(Resource):
    @api.doc('Get a list of products')
    @api.marshal_list_with(product_model)
    def get(self):
        products = Product.query.all()
        return products

    @api.doc('Create a new product')
    @api.expect(product_model)
    def post(self):
        data = request.json
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price']
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product), 201

@app.before_first_request
def init_db():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
