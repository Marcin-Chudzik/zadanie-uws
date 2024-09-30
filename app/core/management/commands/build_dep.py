"""
Django command to wait for the database to be available.
"""
import subprocess
import sys

from django.conf import settings
from django.core.management import call_command
from django.core.management.base import (
    BaseCommand,
    CommandError,
)
from termcolor import colored


class Command(BaseCommand):
    """Django command to wait for database."""
    help = 'Execute commands required for the server run.'
    _called_from_command_line = True

    def add_arguments(self, parser):
        parser.add_argument(
            'extra_commands',
            nargs='?',
            default=[],
            type=list
        )

    def handle(self, *args, **options):
        """Entrypoint for command."""
        commands = [
            'wait_for_db',
            'migrate',
        ]
        extra_commands = options.get('extra_commands', [])

        if isinstance(extra_commands, list):
            commands.extend(extra_commands)

        if settings.DEBUG:
            print(colored('Clearing the database...', 'light_cyan'))

            call_command('flush', interactive=None)

            self.stdout.write(self.style.SUCCESS('Database clear.'))

        for command in commands:
            try:
                call_command(command)

            except FileNotFoundError:
                print(colored(
                    f"""Error {FileNotFoundError} while running
                        file: {command}.py
                        <<Bad path or file name>>""",
                    'red',
                ))
            except PermissionError:
                print(colored(
                    f"""Error {PermissionError} while running
                        file: {command}.py <<Access denied>>
                        No permissions to file.""",
                    'red',
                ))
            except SyntaxError:
                print(colored(
                    f"""Error {SyntaxError} while running
                        file: {command}.py
                        <<Please fix it and re-run command>>""",
                    'red',
                ))
            except CommandError:
                print(colored(
                    f"""Error {CommandError} while running
                        command: {command}.py
                        <<Command does not exist>>""",
                    'red',
                ))
            except subprocess.CalledProcessError as error:
                print(colored(
                    f'Error running: {command}.py :\n{error.stderr}\n', 'red')
                )
                sys.exit(1)

        print(colored('All commands executed successfully.', 'green'))
