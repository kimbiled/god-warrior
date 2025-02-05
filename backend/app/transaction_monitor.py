import time
from sqlalchemy.orm import Session
from . import crud, database


def monitor_transactions():
    while True:
        db: Session = database.SessionLocal()
        pending_deposits = (
            db.query(models.Deposit).filter(models.Deposit.status == "pending").all()
        )
        for deposit in pending_deposits:
            if check_transaction(deposit.wallet_address):
                deposit.status = "confirmed"
                user = deposit.user
                user.balance += deposit.amount
                db.commit()
        db.close()
        time.sleep(60)


def check_transaction(wallet_address: str) -> bool:
    return True # Placeholder
