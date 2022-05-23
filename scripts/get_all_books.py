import requests
import json
import multiprocessing

response_API = requests.get(
    'https://openlibrary.org/search.json?q=first_publish_year%3A[1900+TO+2022]+AND+language%3Afre+AND+has_fulltext%3Atrue&fields=title,author_name,cover_i,first_publish_year')

data = response_API.json()
num_found = data['numFound']
num_pages = num_found//100 + 1


def get_books(start, end):
    with open(f"out/books_{start}-{end}.json", 'a') as file:
        for i in range(start, end):
            response_API = requests.get(
                'https://openlibrary.org/search.json?q=first_publish_year%3A[1900+TO+2022]+AND+language%3Afre+AND+has_fulltext%3Atrue&fields=title,author_name,cover_i,first_publish_year&page=' + str(i))
            data = response_API.json()
            books = data['docs']
            print(f"Page {i} of {end-start}")
            file.write(json.dumps(books, indent=4))


proc1 = multiprocessing.Process(target=get_books, args=(1, num_pages//10))
proc2 = multiprocessing.Process(
    target=get_books, args=(num_pages//10, 2*num_pages//10))
proc3 = multiprocessing.Process(
    target=get_books, args=(2*num_pages//10, 3*num_pages//10))
proc4 = multiprocessing.Process(
    target=get_books, args=(3*num_pages//10, 4*num_pages//10))
proc5 = multiprocessing.Process(
    target=get_books, args=(4*num_pages//10, 5*num_pages//10))
proc6 = multiprocessing.Process(
    target=get_books, args=(5*num_pages//10, 6*num_pages//10))
proc7 = multiprocessing.Process(
    target=get_books, args=(6*num_pages//10, 7*num_pages//10))
proc8 = multiprocessing.Process(
    target=get_books, args=(7*num_pages//10, 8*num_pages//10))
proc9 = multiprocessing.Process(
    target=get_books, args=(8*num_pages//10, 9*num_pages//10))
proc10 = multiprocessing.Process(
    target=get_books, args=(9*num_pages//10, num_pages))

proc1.start()
proc2.start()
proc3.start()
proc4.start()
proc5.start()
proc6.start()
proc7.start()
proc8.start()
proc9.start()
proc10.start()
