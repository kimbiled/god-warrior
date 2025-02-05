import os
import http.client
import json
from dotenv import load_dotenv

# Загрузка переменных окружения из файла .env
load_dotenv()

INFOBIP_API_KEY = os.getenv("INFOBIP_API_KEY")
INFOBIP_BASE_URL = os.getenv("INFOBIP_BASE_URL")


def send_otp_via_whatsapp(phone_number: str, otp: str):
    conn = http.client.HTTPSConnection("api.infobip.com")
    payload = json.dumps({
        "messages": [
            {
                "from": "447860099299",  # Замените на ваш номер WhatsApp
                "to": phone_number,
                "messageId": "40fbbce4-151b-432f-85ec-9d6c866acef8",
                "content": {
                    "templateName": "test_whatsapp_template_en",
                    "templateData": {
                        "body": {
                            "placeholders": [otp]
                        }
                    },
                    "text": f"Your OTP code is {otp}",
                    "language": "en"
                }
            }
        ]
    })
    headers = {
        'Authorization': f'App {INFOBIP_API_KEY}',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    conn.request("POST", "/whatsapp/1/message/template", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))


if __name__ == "__main__":
    # Пример использования функции для отправки OTP
    test_phone_number = "77478379097"  # Замените на тестовый номер телефона
    test_otp = "123456"  # Пример OTP
    send_otp_via_whatsapp(test_phone_number, test_otp)
