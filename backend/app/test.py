import os
import http.client
import json
from dotenv import load_dotenv

load_dotenv()

INFOBIP_API_KEY = os.getenv("INFOBIP_API_KEY")
INFOBIP_BASE_URL = os.getenv("INFOBIP_BASE_URL")


def send_otp_via_whatsapp(phone_number: str, otp: str):
    conn = http.client.HTTPSConnection(INFOBIP_BASE_URL)
    payload = json.dumps(
        {
            "messages": [
                {
                    "from": "447860099299",
                    "to": phone_number,
                    "messageId": "7add4c4f-62c0-4830-ae9f-937cba6023a1",
                    "content": {
                        "templateName": "test_whatsapp_template_en",
                        "templateData": {
                            "body": {
                                "placeholders": ["EWSCC"]
                            }
                        },
                        "language": "en"
                    }
                }
            ]
        }
    )
    headers = {
        "Authorization": f"App {INFOBIP_API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    conn.request("POST", "/whatsapp/1/message/template", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))


if __name__ == "__main__":
    test_phone_number = "77478379097"
    test_otp = "123456"  # Пример OTP
    send_otp_via_whatsapp(test_phone_number, test_otp)
    print(test_phone_number, test_otp)
