from django.shortcuts import render
from .models import Quote,Word
import re
def index(request):
    quote=Quote.objects.values_list('quote')
    word = Word.objects.values_list('search_word')
    fr=dict()
    for wo in word:
        q = wo[0]
        q.strip()
        fr[q] = 0
    for qu in quote:
        qe = re.findall(r"[\w']+|[.,!?;]", qu[0])
        #print(qe)
        for q in qe:
            if q.lower() in fr.keys():
                fr[(q.lower())] += 1
    return render(request, 'quotting/home.html',{'fr': sorted(fr.items())})
