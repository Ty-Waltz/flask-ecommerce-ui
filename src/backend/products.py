from flask import Flask, jsonify, request

app = Flask(__name__)

products = [
    { "id": 1, "name": "Product A", "price": 25.00, "stock": 50 },
    { "id": 2, "name": "Product B", "price": 10.00, "stock": 100 }
]

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in products if p["id"] == product_id), None)
    if product is None:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product)

@app.route('/products', methods=['POST'])
def create_product():
    new_product = request.json
    new_product["id"] = len(products) + 1
    products.append(new_product)
    return jsonify(new_product), 201
