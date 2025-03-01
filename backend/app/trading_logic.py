from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from sqlalchemy.orm import Session
from . import crud, database, models
import threading
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    filename="trading.log",
    filemode="a",
)
logger = logging.getLogger(__name__)


def get_tradingview_price(symbol: str) -> float:
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()), options=options
    )

    url = f"https://www.tradingview.com/symbols/{symbol}/"
    driver.get(url)

    try:
        time.sleep(5)

        price_element = driver.find_element(
            By.CSS_SELECTOR, ".lastContainer-JWoJqCpY .last-JWoJqCpY"
        )
        if price_element:
            price_element = price_element.text.replace("\u202f", "")
            price_element = float(price_element.replace(",", ""))
            logger.info(f"Successfully got price for {symbol}: {price_element}")
        else:
            return "No element"
    except Exception as e:
        logger.error(f"Error getting price for {symbol}: {e}")
        price = None
    finally:
        driver.quit()

    return price_element


def monitor_trades():
    while True:
        logger.info("Monitoring trades...")
        db: Session = database.SessionLocal()
        users = db.query(models.User).all()
        for user in users:
            prices = crud.get_prices_by_user(db, user_id=user.id)
            for price in prices:
                xrp_price = get_tradingview_price("XRPUSD")
                btc_price = get_tradingview_price("BTCUSD")

                if xrp_price is not None and btc_price is not None:
                    logger.info(f"User ID: {user.id}")
                    logger.info(f"XRP Price: {xrp_price}")
                    logger.info(f"BTC Price: {btc_price}")
                    logger.info(f"User Buy Price: {price.buy_price}")
                    logger.info(f"User Sell Price: {price.sell_price}")

                    # Автоматическая покупка XRP
                    if xrp_price <= price.buy_price:
                        amount_to_buy = 100  # Change
                        cost = amount_to_buy * xrp_price
                        if user.usd_balance >= cost:
                            user.xrp_balance += amount_to_buy
                            user.usd_balance -= cost
                            db.commit()
                            logger.info(
                                f"Executed buy trade for user {user.id} at price {xrp_price}"
                            )

                    # Автоматическая продажа BTC
                    if btc_price >= price.sell_price:
                        amount_to_sell = 100  # Change
                        revenue = amount_to_sell * btc_price
                        if user.btc_balance >= amount_to_sell:
                            user.btc_balance -= amount_to_sell
                            user.usd_balance += revenue
                            db.commit()
                            logger.info(
                                f"Executed sell trade for user {user.id} at price {btc_price}"
                            )

        db.close()
        time.sleep(60)


def start_monitoring():
    print("Starting monitoring thread...")
    monitoring_thread = threading.Thread(target=monitor_trades)
    monitoring_thread.start()
