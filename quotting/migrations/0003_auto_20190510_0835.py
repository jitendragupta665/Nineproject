# Generated by Django 2.0.13 on 2019-05-10 03:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quotting', '0002_auto_20190510_0832'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Quotes',
            new_name='Quote',
        ),
        migrations.RenameModel(
            old_name='Words',
            new_name='Word',
        ),
    ]