from openai import OpenAI
from dotenv import load_dotenv
import os, eel

load_dotenv()
client = OpenAI(
    api_key = os.getenv("API_KEY")
)

print(1)
eel.init('web')

global tell 

@eel.expose
def get_data(data):
        print(2)
        tell = client.chat.completions.create(
        model= "gpt-3.5-turbo",
        messages = [{"role": 'user', 'content': "tranlation "+ data[0] + "-" + data[1] + ": " + data[2]}],
        stream=False
        )

        return tell.choices[0].message.content

eel.start('index.html')
