import requests 
from bs4 import BeautifulSoup
import sys

class CouponListing():
    coupon_description=''
    coupon_percent=''
    coupon_code=''

def make_coupon(description,percent,code):
    return CouponListing(description,percent,code)

def get_details():
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0'}
    page = requests.get('https://www.retailmenot.ca/coupons/swisschalet.com',headers=headers)

    c= page.content
    # BeautifulSoup Object
    soup = BeautifulSoup(c,"lxml")
    results=[]

    coupon_list =soup.find(class_='offers')
    coupon_list_offers =coupon_list.find_all(class_='detail')
    # print(coupon_list_offers)
    # # Pull all text from body div 
    for item in coupon_list_offers:
        if soup.find("div", {"class": "crux"}) is not None:
            # print("Tag FSound")
            crux = item.find(class_='crux')
            crux_code=soup.find_all("div", {"class": "code"})
            if crux_code is not None:
                description = soup.find(class_='title')
                
                percent = soup.find(class_='percent').contents[0]
                if crux is not None:
                    code = crux.find(class_='code')
                    code_text=code.contents[0]
                    coupon = {'description': description,
                            'percent': percent,
                            'code_text': code_text}
                    results.append(coupon)
                else:
                    break
            else:
                sys.stdout.flush()
    sys.stdout.flush()
    

def main():
    get_details()


if __name__ == '__main__':
    print('main')
    main()
# # # Pull all text from body div 
# # print(coupon_list)
# coupon_list_offers = coupon_list.find_all(class_='crux')
# # print(coupon_list_offers)

# # # Pull text from <div> from inside coupon_list
# coupon_list_items = coupon_list_offers.find_all('code')
# print(coupon_list_items)

# # for coupon_list_item in coupon_list_items:
# #     print(coupon_list_items.contents[0])
