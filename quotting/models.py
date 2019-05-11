from django.db import models
class Quote(models.Model):
    quote_id = models.IntegerField(primary_key=True)
    author = models.CharField(max_length=200)
    quote = models.TextField()
    def __str__(self):
        return self.author
class Word(models.Model):
    word_id = models.IntegerField(primary_key=True)
    search_word = models.CharField(max_length=200)
    def __str__(self):
        return self.search_word
