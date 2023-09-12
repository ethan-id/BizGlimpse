from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

def scrape_stock(ticker_symbol):
    options = Options()
    options.add_argument('--headless=new')
    driver = webdriver.Chrome(  
        service=ChromeService(ChromeDriverManager().install()),
        options=options
    )
    driver.set_window_size(1150, 1000)

    print(f"Started Scraping: {ticker_symbol}")
    stock = {}
    if (ticker_symbol.isalpha()):
        url = f'https://finance.yahoo.com/quote/{ticker_symbol}'
        driver.get(url)
        stock['ticker'] = ticker_symbol

        # scraping logic...
        try:
            stock['regular_market_price'] = driver.find_element(By.CSS_SELECTOR, f'[data-symbol="{ticker_symbol}"][data-field="regularMarketPrice"]').text
            stock['regular_market_change'] = driver.find_element(By.CSS_SELECTOR, f'[data-symbol="{ticker_symbol}"][data-field="regularMarketChange"]').text
            stock['regular_market_change_percent'] = driver.find_element(By.CSS_SELECTOR, f'[data-symbol="{ticker_symbol}"][data-field="regularMarketChangePercent"]').text.replace('(', '').replace(')', '')
        except:
            print(f"Warning: Couldn't find regular market data for {ticker_symbol}")

        try:
            stock['post_market_price'] = driver.find_element(By.CSS_SELECTOR, f'[data-symbol="{ticker_symbol}"][data-field="postMarketPrice"]').text
            stock['post_market_change'] = driver.find_element(By.CSS_SELECTOR, f'[data-symbol="{ticker_symbol}"][data-field="postMarketChange"]').text
            stock['post_market_change_percent'] = driver.find_element(By.CSS_SELECTOR, f'[data-symbol="{ticker_symbol}"][data-field="postMarketChangePercent"]').text.replace('(', '').replace(')', '')
        except:
            print(f"Warning: Couldn't find post market data for {ticker_symbol}")

        try:
            stock['previous_close'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="PREV_CLOSE-value"]').text
        except:
            print(f'\tCouldn\'t find previous close for {ticker_symbol}')

        try:
            stock['open_value'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="OPEN-value"]').text
        except:
            print(f'\tCouldn\'t find open valuefor {ticker_symbol}')

        try:
            stock['bid'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="BID-value"]').text
        except:
            print(f'\tCouldn\'t find bid for {ticker_symbol}')
        
        try:
            stock['ask'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="ASK-value"]').text
        except:
            print(f'\tCouldn\'t find ask for {ticker_symbol}')
        
        try:
            stock['days_range'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="DAYS_RANGE-value"]').text
        except:
            print(f'\tCouldn\'t find days range for {ticker_symbol}')
        
        try:
            stock['week_range'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="FIFTY_TWO_WK_RANGE-value"]').text
        except:
            print(f'\tCouldn\'t find week range for {ticker_symbol}')

        try:
            stock['volume'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="TD_VOLUME-value"]').text
        except:
            print(f'\tCouldn\'t find volume for {ticker_symbol}')
        
        try:
            stock['avg_volume'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="AVERAGE_VOLUME_3MONTH-value"]').text
        except:
            print(f'\tCouldn\'t find AVG volume for {ticker_symbol}')

        try:
            stock['market_cap'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="MARKET_CAP-value"]').text
        except:
            print(f'\tCouldn\'t find market cap for {ticker_symbol}')

        try:
            stock['beta'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="BETA_5Y-value"]').text
        except:
            print(f'\tCouldn\'t find beta for {ticker_symbol}')
        
        try:
            stock['pe_ratio'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="PE_RATIO-value"]').text
        except:
            print(f'\tCouldn\'t find pe ratio for {ticker_symbol}')
        
        try:
            stock['eps'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="EPS_RATIO-value"]').text
        except:
            print(f'\tCouldn\'t find eps for {ticker_symbol}')

        try:
            stock['earnings_date'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="EARNINGS_DATE-value"]').text
        except:
            print(f'\tCouldn\'t find earnings date for {ticker_symbol}')

        try:
            stock['dividend_yield'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="DIVIDEND_AND_YIELD-value"]').text
        except:
            print(f'\tCouldn\'t find dividend yield for {ticker_symbol}')
        
        try:
            stock['ex_dividend_date'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="EX_DIVIDEND_DATE-value"]').text
        except:
            print(f'\tCouldn\'t find ex dividend date for {ticker_symbol}')

        try:
            stock['year_target_est'] = driver.find_element(By.CSS_SELECTOR, '#quote-summary [data-test="ONE_YEAR_TARGET_PRICE-value"]').text
        except:
            print(f'\tCouldn\'t find year target est. about {ticker_symbol}')

    print(f"Finished Scraping: {ticker_symbol}")
    driver.quit()
    return stock