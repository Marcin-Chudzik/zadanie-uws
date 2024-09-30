"""
Django command to wait for the database to be available.
"""
import time

from psycopg2 import OperationalError as Psycopg2Error

from django.db.utils import OperationalError
from django.core.management.base import BaseCommand

from termcolor import colored


class Command(BaseCommand):
    """Django command to wait for database."""

    def handle(self, *args, **options):
        """Entrypoint for command."""
        print(colored('Waiting for database...', 'cyan'))
        db_up = False

        while db_up is False:
            try:
                self.check(databases=['default'])
                db_up = True
            except (Psycopg2Error, OperationalError):
                print(colored(
                    'Database unavailable, waiting 1 second...',
                    'red'))
                time.sleep(1)

        print(colored('Database connected successfully.', 'green'))
