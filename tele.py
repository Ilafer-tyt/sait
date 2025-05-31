import telebot
Token = '8107951588:AAFDIgcNcFcVTsrNJYq6bHTim4bO9GCgyeU'
bot = telebot.TeleBot(Token)
@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.reply_to(message, message.chat.id)
bot.polling()
                                           


# тексттекст.


# https://api.telegram.org/bot8107951588:AAFDIgcNcFcVTsrNJYq6bHTim4bO9GCgyeU/sendMessage?chat_id=2105392986&text=