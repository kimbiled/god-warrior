import requests
import time
from sqlalchemy.orm import Session
from . import crud, database, models
import logging
from dotenv import load_dotenv
import os 
import threading

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    filename="blockchain_monitor.log",
    filemode="a",
)
logger = logging.getLogger(__name__)

BLOCKCYPHER_API_KEY = os.getenv("BLOCKCYPHER_KEY")
BLOCKCYPHER_BASE_URL = "https://api.blockcypher.com/v1/btc/main"

def check_transaction(wallet_address: str):
    url = f"{BLOCKCYPHER_BASE_URL}/addrs/{wallet_address}/full?token={BLOCKCYPHER_API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        logger.error(f"Error checking transaction for {wallet_address}: {response.text}")
        return None