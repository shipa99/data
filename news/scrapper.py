import requests
from bs4 import BeautifulSoup


def extract_news(parser):
    """ Extract news from a given web page """
    news_list = []
    rows = parser.findAll('table')[2].findAll('tr')
    for i in range(0, 89, 3):
        try:
            dic = {'title': rows[i].findAll('a')[1].text}
        except (ValueError, IndexError):
            dic = {'title': 'No title'}
        
        try:
            dic['author'] = rows[i + 1].a.text
        except (ValueError, IndexError):
            dic['author'] = 'No author'

        try:
            dic['url'] = rows[i].findAll('a')[1]['href']
        except (ValueError, IndexError):
            dic['url'] = 'No URL'
        
        try:
            dic['comments'] = int(rows[i + 1].findAll('a')[3].text.split()[0])
        except (ValueError, IndexError):
            dic['comments'] = 'No comments'
        
        try:
            dic['points'] = int(rows[i + 1].span.text.split()[0])
        except (ValueError, IndexError):
            dic['points'] = 'No points'
        news_list.append(dic)
    return news_list


def extract_next_page(parser):
    """ Extract next page URL """
    rows = parser.findAll('table')[2].findAll('tr')
    try:
        next_page = rows[-1].a['href']
        return next_page
    except TypeError:
        pass

def get_news(url, n_pages=1):
    """ Collect news from a given web page """
    news = []
    while n_pages:
        print("Collecting data from page: {}".format(url))
        response = requests.get(url)
        soup = BeautifulSoup(response.text, "html.parser")
        news_list = extract_news(soup)
        next_page = extract_next_page(soup)
        if type(next_page) == str:
            url = "https://news.ycombinator.com/" + next_page
            news.extend(news_list)
            n_pages -= 1
        else:
            n_pages = 0
    return news
