# Generated by Django 5.0.2 on 2024-03-28 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emotion', '0016_emotionhistory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emotionhistory',
            name='image',
            field=models.TextField(),
        ),
    ]
