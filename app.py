from openai import OpenAI
from dotenv import load_dotenv
import os, sys, json


input_data = sys.stdin.read()
print(input_data)



load_dotenv()
client = OpenAI(
    api_key = os.getenv("API_KEY")
)
def translation(tol, inl, text):
    tell = client.chat.completions.create(
        model= "gpt-3.5-turbo",
        messages = [{"role": 'user', 'content': "tranlation "+ tol + "-" + inl + ": " + text}],
        stream=False
        
    )
    return tell.choices[0].message.content


out_text = translation("en", "ru", "text")

output_json = json.dumps(out_text)
print(output_json)