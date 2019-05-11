import csv,os
path =  "C:\\Users\\Jitendra\\Nine\\csvfiles"
os.chdir(path)
from quotting.models import Quote, Word
with open('Quotes - quotes.csv') as csvfile:
     reader = csv.DictReader(csvfile)
     for row in reader:
             Q = Quote(quote_id=row['quote_id'], author=row['author'],quote=row['quote'])
             Q.save()
with open('Words - Sheet1.csv') as csvfile:
     reader = csv.DictReader(csvfile)
     for row in reader:
             W = Word(word_id=row['word_id'], search_word=row['search_word'])
             W.save()
