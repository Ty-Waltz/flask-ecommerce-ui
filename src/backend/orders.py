from flask import Flask, jsonify, request

app = Flask(__name__)

orders = [
    { "id": 1, "customer_id": 1, "total": 100.50, "status": "Completed" },
    { "id": 2, "customer_id": 2, "total": 250.00, "status": "Pending" }
]

@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify(orders)

@app.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = next((o for o in orders if o["id"] == order_id), None)
    if order is None:
        return jsonify({"error": "Order not found"}), 404
    return jsonify(order)

@app.route('/orders', methods=['POST'])
def create_order():
    new_order = request.json
    new_order["id"] = len(orders) + 1
    orders.append(new_order)
    return jsonify(new_order), 201
