import requests
from bs4 import BeautifulSoup
from .product import Product

HEADERS = ({'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})

def amazon_scraper_1(product_type):
    data = []
    AMAZON_URL = "https://www.amazon.in/s?k="+product_type
    for page in range(1, 2):
        url = AMAZON_URL + '&ref=sr_pg_'+str(page)
        webpage = requests.get(url, headers=HEADERS)
        soup = BeautifulSoup(webpage.content, "lxml")
        
        for product_id in range(6,20):
            try:
                attribute = 'MAIN-SEARCH_RESULTS-'+str(product_id)
                product_data = soup.find("div",attrs={'cel_widget_id':attribute})
                

                price_data = product_data.find("div", attrs={"class":"a-section a-spacing-none a-spacing-top-micro s-price-instructions-style"})
                rating_data = product_data.find("div", attrs={'class': "a-section a-spacing-none a-spacing-top-micro"})

                title = (product_data.find("span", attrs={'class':"a-size-medium a-color-base a-text-normal"})).text
                link = 'https://www.amazon.in' + (product_data.find("a", attrs={'class': 'a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal'})).get('href')
                rating = rating_data.find("span", attrs={'class': "a-size-base"}).text
                reviews = rating_data.find("span", attrs={'class':"a-size-base s-underline-text"}).text
                price = price_data.find("span", attrs={'class':'a-offscreen'}).text
                img = (product_data.find("img", attrs={"class":"s-image"})).get('src')

                product = Product("amazon",title, link, rating, reviews, price, img)
                data.append(product)
            except:
                pass
        
    return data

def flipkart_scraper_1(product_type):
    data = []
    FLIPKART_URL = "https://www.flipkart.com/search?q="+product_type
    for page in range(1,2):
        url = FLIPKART_URL + '&page='+str(page)
        webpage = requests.get(url, headers=HEADERS)
        soup = BeautifulSoup(webpage.content, "lxml")        
        rows = soup.find_all("div", attrs={"class":"_13oc-S"})

        for curr_row in rows:
            try:
                row_products = curr_row.find_all("div", attrs={'class':'_4ddWXP'})
                try:
                    for row_product in row_products:
                        product_data = (row_product.find('a', attrs={'class':'s1Q9rs'}))
                        img = (row_product.find('img', attrs={'class': '_396cs4'})).get('src')
                        title = product_data.get('title')
                        link = 'https://www.flipkart.com' + product_data.get('href')
                        rating = (row_product.find('div', attrs={'class':'_3LWZlK'})).text
                        reviews = (row_product.find('span', attrs={'class':'_2_R_DZ'})).text
                        price = row_product.find('div', attrs={'class':"_30jeq3"}).text
                        product = Product("flipkart",title, link, rating, reviews, price, img)
                        data.append(product)
                except:
                    pass
            except:
                pass
    return data

def amazon_scraper_2(product_type):
    data = []
    AMAZON_URL = "https://www.amazon.in/s?k="+product_type
    for page in range(1, 2):
        url = AMAZON_URL + '&ref=sr_pg_'+str(page)
        webpage = requests.get(url, headers=HEADERS)
        soup = BeautifulSoup(webpage.content, "lxml")
        for product_id in range(4, 30):
            try:
                attribute = 'MAIN-SEARCH_RESULTS-'+str(product_id)
                product_data = soup.find("div",attrs={'cel_widget_id':attribute})
                img_data = product_data.find("span", attrs={'data-component-type':'s-product-image'})
                

                link = 'https://www.amazon.in' + (img_data.find("a", attrs={'class': 'a-link-normal s-no-outline'})).get('href')
                img = (img_data.find("img", attrs={"class":"s-image"})).get('src')
            
                more_details_element = product_data.find('div', attrs={'class':'a-section a-spacing-small puis-padding-left-small puis-padding-right-small'})
                title = more_details_element.find('h2', attrs={'class':'a-size-mini a-spacing-none a-color-base s-line-clamp-4'}).text
                review_data_element = more_details_element.find('div', attrs={'class':'a-section a-spacing-none a-spacing-top-micro'})
                rating = review_data_element.find('span', attrs={'class':'a-size-base'}).text
                reviews = review_data_element.find('span', attrs={'class':'a-size-base s-underline-text'}).text
                
                price_data = product_data.find("div", attrs={"class":"a-section a-spacing-none a-spacing-top-small s-price-instructions-style"})
                price = price_data.find("span", attrs={'class':'a-offscreen'}).text
                
                product = Product("amazon",title, link, rating, reviews, price, img)
                data.append(product)
            except:
                pass
    return data

def flipkart_scraper_2(product_type):
    data = []
    FLIPKART_URL = "https://www.flipkart.com/search?q="+product_type
    for page in range(1,2):
        url = FLIPKART_URL + '&page='+str(page)
        webpage = requests.get(url, headers=HEADERS)
        soup = BeautifulSoup(webpage.content, "lxml")

        rows = soup.find_all("div", attrs={"class":"_13oc-S"})
        for product in rows:
            try:
                prod_data = product.find('a', attrs={'class':'_1fQZEK'})
                link = 'https://www.flipkart.com' + prod_data.get('href')
                img = prod_data.find('img', attrs={'class':'_396cs4'})
                img_url = img.get('src')
                title = img.get('alt')
                rating = (product.find('div', attrs={'class':'_3LWZlK'})).text
                review = product.find('span', attrs={'class':'_2_R_DZ'}).text
                price = product.find('div', attrs={'class':'_30jeq3 _1_WHN1'}).text
                product = Product("flipkart",title, link, rating, review,price, img_url)
                data.append(product)
            except Exception as e:
                pass
    return data
    

def amazon_details(url):
    try:
        webpage = requests.get(url, headers=HEADERS)
        soup = BeautifulSoup(webpage.content, "lxml")
        discount = soup.find('span', attrs={'class':"a-size-large a-color-price savingPriceOverride aok-align-center reinventPriceSavingsPercentageMargin savingsPercentage"}).text
        real_price_data = soup.find('span', attrs={'class':'a-size-small a-color-secondary aok-align-center basisPrice'})
        real_price = real_price_data.find('span', attrs={'class':'a-offscreen'}).text
        desc_data = soup.find('ul', attrs={'class':'a-unordered-list a-vertical a-spacing-mini'})
        desc = desc_data.text
        return {
            "discount": discount,
            "real_price": real_price,
            "desc": desc
        }
    except:
        return {}

def flipkart_details(url):
    try:
        webpage = requests.get(url, headers=HEADERS)
        soup = BeautifulSoup(webpage.content, "lxml")
        real_price = soup.find('div', attrs={'class':'_3I9_wc _2p6lqe'}).text
        discount = soup.find('div', attrs={'class':'_3Ay6Sb _31Dcoz'}).text
        desc = soup.find('div', attrs={'class':'_2418kt'}).text
        return {
            "discount": discount,
            "real_price": real_price,
            "desc": desc
        }
    except:
        return {}


def get_details(site, link):
    if site == "amazon":
        return amazon_details(link)
    elif site == "flipkart":
        return flipkart_details(link)


def amazon_track_details(url):
    try:
        webpage = requests.get(url, headers=HEADERS)
        soup = BeautifulSoup(webpage.content, "lxml")
        title = soup.find('span', attrs={'id':'productTitle'}).text.strip()
        ratings = soup.find('span', attrs={'id':'acrCustomerReviewText'}).text.replace(' ratings', '')
        stars = soup.find('span', attrs={'id':'acrPopover'}).get('title').replace(' out of 5 stars', '')
        price = soup.find('span', attrs={'class':'a-price aok-align-center reinventPricePriceToPayMargin priceToPay'}).find('span', attrs={'class':'a-offscreen'}).text
        discount = soup.find('span', attrs={'class':"a-size-large a-color-price savingPriceOverride aok-align-center reinventPriceSavingsPercentageMargin savingsPercentage"}).text
        real_price_data = soup.find('span', attrs={'class':'a-size-small a-color-secondary aok-align-center basisPrice'})
        real_price = real_price_data.find('span', attrs={'class':'a-offscreen'}).text
        desc_data = soup.find('ul', attrs={'class':'a-unordered-list a-vertical a-spacing-mini'})
        desc = desc_data.text
        return {
            "title": title,
            "ratings": ratings,
            "price": price,
            "stars": stars,
            "discount": discount,
            "real_price": real_price,
            "desc": desc
        }
    except:
        return {}

    
def flipkart_track_details(url):
    try:
        webpage = requests.get(url, headers=HEADERS)
        soup = BeautifulSoup(webpage.content, "lxml")
        title = soup.find('span', attrs={'class':'B_NuCI'}).text
        stars = soup.find('div', attrs={'class':'_3LWZlK'}).text
        ratings = soup.find('span', attrs={'class':'_2_R_DZ'}).text
        subst = ratings.find(' Ratings')
        ratings = ratings[:subst]
        price = soup.find('div', attrs={'class':'_30jeq3 _16Jk6d'}).text
        real_price = soup.find('div', attrs={'class':'_3I9_wc _2p6lqe'}).text
        discount = soup.find('div', attrs={'class':'_3Ay6Sb _31Dcoz'}).text
        desc = soup.find('div', attrs={'class':'_2418kt'}).text
        return {
            "title": title,
            "star": stars,
            "ratings": ratings,
            "price": price,
            "discount": discount,
            "real_price": real_price,
            "desc": desc
        }
    except:
        return {}
    
def get_track_details(link):
    site = link.split('.')[1]
    if site == "amazon":
        return amazon_track_details(link)
    elif site == "flipkart":
        return flipkart_track_details(link)