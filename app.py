from openai import OpenAI
from dotenv import load_dotenv
import os
load_dotenv()
client = OpenAI(
    api_key = os.getenv("API_KEY")
)

text = "I am bad"
tell = client.chat.completions.create(
    model= "gpt-3.5-turbo",
    messages = [{"role": 'user', 'content': "hi"}],
    stream=False
    
)
print(tell.choices[0].message.content)