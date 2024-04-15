import telebot
from telebot import types
import sqlite3
import requests

bot = telebot.TeleBot('7084613005:AAEXhjc_oMzP50OfxuORkeBe2Q2zvFO8YnU')

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

# Функція для відправлення даних на сервер
def send_data_to_server(user_id, click_count, energy):
    url = 'http://127.0.0.1:5000/update_data'
    data = {
        'user_id': user_id,
        'clickCount': click_count,
        'energy': energy
    }
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("Data sent successfully")
    else:
        print("Failed to send data")

# Створення клавіатури з кнопками
def create_menu():
    markup = types.InlineKeyboardMarkup(row_width=1)
    about_us_button = types.InlineKeyboardButton("Про нас", callback_data='help')
    play_button = types.InlineQueryResultsButton("Грати", web_app=types.WebAppInfo(url="https://pitertimch.github.io/WebApp/"))
    markup.add(about_us_button, play_button)
    return markup

# Обробник команди /start
@bot.message_handler(commands=['start'])
def send_welcome(message):
    text = "Привіт! Я телеграм-бот."

    user_id = message.chat.id
    # Перевірка, чи користувач вже існує в базі даних
    cursor.execute("SELECT id FROM users WHERE id=?", (user_id,))
    existing_user = cursor.fetchone()
    if not existing_user:
        cursor.execute("INSERT INTO users (id, clickCount, energy) VALUES (?, 0, 500)", (user_id,))
        conn.commit()

    # Відправляємо фото з приєднаним текстом
    photo = open('Images/StartLogo.jpg', 'rb')
    bot.send_photo(message.chat.id, photo, caption=text, reply_markup=create_menu())
    photo.close()

    # Отримання даних з бази даних та відправка на сервер
    cursor.execute("SELECT clickCount, energy FROM users WHERE id=?", (user_id,))
    data = cursor.fetchone()
    click_count, energy = data if data else (0, 500)
    send_data_to_server(user_id, click_count, energy)


# Основний обробник повідомлень
@bot.message_handler(func=lambda message: True)
def handle_message(message):
    bot.reply_to(message, "Це бот, поки що все :)")


# Запуск бота
if __name__ == '__main__':
    bot.polling()