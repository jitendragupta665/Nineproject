# Generated by Django 2.0.13 on 2019-05-10 03:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quotting', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Quote',
            new_name='Quotes',
        ),
        migrations.RenameModel(
            old_name='Word',
            new_name='Words',
        ),
    ]
