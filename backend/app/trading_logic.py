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


def check_prices_and_execute_trades(db: Session):
    users = crud.get_all_users(db)
    current_prices_list = crud.get_current_market_prices(db)

    # Преобразуем список текущих цен в словарь
    current_prices = {price.currency: price.price for price in current_prices_list}

    for user in users:
        buy_orders = crud.get_buy_orders(db, user_id=user.id)
        sell_orders = crud.get_sell_orders(db, user_id=user.id)

        for order in buy_orders:
            if (
                current_prices.get(order.currency) is not None
                and current_prices[order.currency] <= order.price
            ):
                pass

        for order in sell_orders:
            if (
                current_prices.get(order.currency) is not None
                and current_prices[order.currency] >= order.price
            ):
                pass


def monitor_trades():
    while True:
        logger.info("Monitoring trades...")
        db: Session = database.SessionLocal()
        xrp_price = get_tradingview_price("XRPUSD")
        btc_price = get_tradingview_price("BTCUSD")
        current_prices = {
            "XRPUSD": xrp_price,
            "BTCUSD": btc_price,
        }

        if xrp_price is not None and btc_price is not None:
            for currency, price in current_prices.items():
                crud.update_current_market_price(db, currency, price)

            check_prices_and_execute_trades(db)

        db.close()
        time.sleep(60)


def start_monitoring():
    print("Starting monitoring thread...")
    monitoring_thread = threading.Thread(target=monitor_trades)
    monitoring_thread.start()
