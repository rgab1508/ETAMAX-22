# Generated by Django 3.2.9 on 2022-01-11 04:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0002_auto_20220111_1010'),
        ('events', '0003_auto_20220111_1010'),
        ('users', '0002_auto_20211229_2135'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='participation',
            name='is_paid',
        ),
        migrations.RemoveField(
            model_name='participation',
            name='transaction_id',
        ),
        migrations.AddField(
            model_name='participation',
            name='transaction',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='participations', to='transactions.transaction'),
        ),
        migrations.AlterField(
            model_name='participation',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participations', to='events.event'),
        ),
    ]
