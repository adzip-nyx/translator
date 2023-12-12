from openai import OpenAI
from dotenv import load_dotenv
import os, eel

load_dotenv()
client = OpenAI(
    api_key = os.getenv("API_KEY")
)

eel.init('web') 

@eel.expose
def get_data(data):
        print(2)
        tell = client.chat.completions.create(
        model= "gpt-3.5-turbo",
        messages = [{"role": 'user', 'content': "tranlation "+ data[0] + "-" + data[1] + ": " + data[2]}],
        stream=False
        )
        text = tell.choices[0].message.content
        if "Translation:" in text:
            text = text[12::]
        return text

eel.start('index.html')
