from flask import Flask, request, jsonify
import psycopg2
import os

app = Flask(__name__)

# Conexão com o banco de dados
def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )
    return conn

@app.route('/products', methods=['GET', 'POST'])
def products():
    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'POST':
        data = request.json
        cursor.execute('INSERT INTO products (name, price) VALUES (%s, %s)', (data['name'], data['price']))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Product added'}), 201

    cursor.execute('SELECT * FROM products')
    products = cursor.fetchall()
    conn.close()
    return jsonify([{'id': p[0], 'name': p[1], 'price': p[2]} for p in products])

@app.route('/products/<int:id>', methods=['PUT', 'DELETE'])
def manage_product(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'PUT':
        data = request.json
        cursor.execute('UPDATE products SET name = %s, price = %s WHERE id = %s', (data['name'], data['price'], id))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Product updated'}), 200

    if request.method == 'DELETE':
        cursor.execute('DELETE FROM products WHERE id = %s', (id,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Product deleted'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)