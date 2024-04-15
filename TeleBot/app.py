from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Підключення до бази даних SQLite
conn = sqlite3.connect('bot_database.db', check_same_thread=False)
cursor = conn.cursor()

# Створення таблиці користувачів (якщо не існує)
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        clickCount NUMERIC,
        energy INTEGER
    )
''')
conn.commit()

@app.route('/update_data', methods=['POST'])
def update_data():
    data = request.json
    user_id = data.get('user_id')
    click_count = data.get('clickCount')
    energy = data.get('energy')

    # Оновлення даних користувача в базі даних
    cursor.execute("UPDATE users SET clickCount=?, energy=? WHERE id=?", (click_count, energy, user_id))
    conn.commit()

    return jsonify({'message': 'Data received successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
