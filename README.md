# ADZIP-NYX Translator with ChatGPT

**Примечание, для корректной работоспособности программы, необходим API-ключ от OpenAI.
Доступ к OpenAI с русских IP-адресов, заблокирован, используйте VPN.**

## Шаг 1. Установка и запуск

Скачайте последнюю версию проекта.

### С сайта

Скачать [последнюю версию проекта](https://codeload.github.com/adzip-nyx/translator/zip/refs/heads/main).

### Или при помощи Git (возможность быстро обновить проект до последней версии)

```
git clone https://github.com/adzip-nyx/translator.git
```

*Если у вас не установлен git, скачайте его [по ссылке](https://git-scm.com/download/win).*

## Шаг 2. Установка зависсимостей

1. Для python.
```
pip install openai eel dotenv
```
2. Для node.
```
npm i
```

*Если у вас не установлен node, скачайте его [по ссылке](https://nodejs.org/en/download/current)*

## Шаг 3. Добавление API-ключа

Перейдите в файл .env в корневой директории проекта, и замените *<вставьте свой API ключ сюда>*, на свой API-ключ.

## Шаг 4. Запуск программы

```
npm start
```

## Если возникли вопросы, или вы нашли баг

Напишите о нем в [#Баги](https://github.com/adzip-nyx/translator/issues/1)

Лицензия [MIT](LICENSE)

ADZIP-NYX