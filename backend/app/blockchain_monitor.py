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

def monitor_transactions():
    while True:
        logger.info("Monitoring blockchain transactions...")
        db: Session = database.SessionLocal()
        deposits = db.query(models.Deposit).filter(models.Deposit.status == "pending").all()
        for deposit in deposits:
            transaction_data = check_transaction(deposit.wallet_address)
            if transaction_data:
                for tx in transaction_data["txs"]:
                    if tx["confirmations"] > 0:
                        deposit.amount = tx["total"] / 100000000
                        deposit.status = "confirmed"
                        user = db.query(models.User).filter(models.User.id == deposit.user_id).first()
                        user.btc_balance += deposit.amount
                        db.commit()
                        logger.info(f"Transaction confirmed for {deposit.wallet_address}, amount: {deposit.amount}")
        db.close()
        time.sleep(60)

def start_monitoring():
    print("Starting blockchain monitoring thread...")
    monitoring_thread = threading.Thread(target=monitor_transactions)
    monitoring_thread.start()