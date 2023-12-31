from openai import OpenAI
from dotenv import load_dotenv
import os, eel, eel.browsers
#библиотеки
load_dotenv()
#объявление api ключа для связи с ChatGPT
client = OpenAI(
    api_key = os.getenv("API_KEY")
)

eel.init('web') 

# get запрос по eel для передачи данных из js в python
@eel.expose
def get_data(data):
        #запрос у ChatGPT
        tell = client.chat.completions.create(
        model= "gpt-3.5-turbo",
        messages = [{"role": 'user', 'content': 'No comments just text translate '+ data[0] + ' - ' + data[1] + ': "' + data[2] + '"'}],
        stream=False
        )
        
        #Парсер ответа
        text = tell.choices[0].message.content
        
        # Замена возможных текстов из ChatGPT
        if 'Translation: "' in text:
            text = text[14:-1]
        elif text[0] == '"':
            text = text[1:-1]
        elif "Translation:" in text:
            text = text[13:]
        elif text[1:] == '"' and text[:-1] == '"':
             text = text[1:-1]
        #Возврат данных обратно в js код
        return text
    
    
eel.browsers.set_path('electron', './node_modules/electron/dist/electron')

eel.start('index.html', mode='electron' , port=8000  ,host='localhost',disable_cache=True, close_callback='close_callback', )