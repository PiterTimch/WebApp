import telebot
from telebot import types

# Створення бота
bot = telebot.TeleBot('7084613005:AAEXhjc_oMzP50OfxuORkeBe2Q2zvFO8YnU')

# Створення клавіатури з кнопками
def create_menu():
    markup = types.InlineKeyboardMarkup(row_width=1)
    about_us_button = types.InlineKeyboardButton("Про нас", callback_data='help')
    play_button = types.InlineQueryResultsButton("Грати", web_app=types.WebAppInfo(url="https://pitertimch.github.io/WebApp/"))
    markup.add(about_us_button, play_button)
    return markup

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    text = "Привіт! Я телеграм-бот."

    # Відправляємо фото з приєднаним текстом
    photo = open('Images/StartLogo.jpg', 'rb')
    bot.send_photo(message.chat.id, photo, caption=text, reply_markup=create_menu())

    photo.close()

# Обробник натискання на кнопки
@bot.callback_query_handler(func=lambda call: True)
def callback_handler(call):
    if call.data == 'help':
        bot.send_message(call.message.chat.id, "Це бот, поки шо все :)")
    elif call.data == 'play':
        bot.send_message(call.message.chat.id, "Ну, тут має бути гра, колись...")

bot.polling()