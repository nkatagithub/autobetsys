#This script was made for offline scraping first because the internet in this area isnt the best
#u might come across some bugs but i have tried to supress them
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import random
import requests

#TODO: Scrape betexplorer for all matches
url = 'https://www.betexplorer.com/next/soccer/'
page = requests.get(url)
# soup = BeautifulSoup(open('index.html'), features= 'lxml')
soup1 = BeautifulSoup(page.text, features = 'lxml')
for st in soup1.find_all('strong'):
    st.unwrap()
table1 = soup1.find('table', class_='table-main js-nrbanner-t')
tds = table1.find_all('td', class_='table-main__tt')


for ta_d in tds:
    #tym
    tym = ta_d.find('span', class_='table-main__time')
    real_tym = tym.contents[0]
    #link
    l = ta_d.find('a')
    link = l['href']
    #match
    l.span.unwrap()
    l.span.unwrap()
    match = l.contents
    fulmatch = "".join(match)
    print(fulmatch)
    print(real_tym)
    print(link)
    print("")

################################Proxy iterator#############################

ua = UserAgent() # From here we generate a random user agent
proxies = [] # Will contain proxies [ip, port]

def random_proxy():
    return random.randint(0, len(proxies) - 1)

# Retrieve latest proxies
proxies_req = Request('https://www.sslproxies.org/')
proxies_req.add_header('User-Agent', ua.random)
proxies_doc = urlopen(proxies_req).read().decode('utf8')
soup = BeautifulSoup(proxies_doc, 'html.parser')
proxies_table = soup.find(id='proxylisttable')

# Save proxies in the array
for row in proxies_table.tbody.find_all('tr'):
    proxies.append({

        'ip':   row.find_all('td')[0].string,
        'port': row.find_all('td')[1].string
    })

# Choose a random proxy
proxy_index = random_proxy()
proxy = proxies[proxy_index]


# Make the call
try:
    for n in range(1, 500):
        req = Request('http://icanhazip.com')
        req.set_proxy(proxy['ip'] + ':' + proxy['port'], 'http')
        my_ip = urlopen(req).read().decode('utf8')
        print('#' + my_ip)

        #for every 10 requests select

        if n % 2 == 0:
            proxy_index = random_proxy()
            proxy = proxies[proxy_index]
except: # If error, delete this proxy and find another one
    del proxies[proxy_index]
    print('Proxy ' + proxy['ip'] + ':' + proxy['port'] + ' deleted.')
    proxy_index = random_proxy()
    proxy = proxies[proxy_index]

# Retrieve a random index proxy (we need the index to delete it if not working)

###########################################################################

PROXY = (proxy['ip'] + ':' + proxy['port'])
options = Options()
options.add_argument('--proxy-server=%s' % PROXY)
options.headless = True
driver = webdriver.Firefox(options=options, executable_path='geckodriver')

# TODO: Enter into the link with selenium and click h2h matches link for drop down and iterate(todo)
driver.get('https://www.betexplorer.com/soccer/brazil/serie-a/gremio-corinthians/Kd3wktIJ/')
try:
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located(
            (By.CLASS_NAME, "wrap-section__header__link")))
finally:
    driver.find_element_by_class_name('wrap-section__header__link').click()
    WebDriverWait(driver, 4).until(EC.presence_of_element_located((By.ID, 'mutual_div')))


mutual_table = driver.find_element_by_id('js-mutual-table')
mutual_td = mutual_table.find_elements_by_class_name('h-text-center')

tg = []
slist = []
for dt in mutual_td:
    score = dt.text
    slist.append(score)

for s in slist:
    # TODO: Get total for each match in previous head to heads
    if s != 'POSTP.' and 'CAN.':
        t = s.split(':')
        g1 = t[0]
        g2 = t[1]
        totalgoals = int(g1)+int(g2)
        tg.append(totalgoals)
        driver.quit()
    # check this for bugs
    else:
        continue

# TODO: Match up the algorithm
# TODO: Store the qualified matches (and the unqualified for further data analysis)(todo)
for i in tg:
    print(i)