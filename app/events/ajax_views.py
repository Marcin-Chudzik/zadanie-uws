import requests
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.conf import settings


@csrf_protect
def fetch_events_for_month(request, selected_month: int):
    """Fetching detailed data of filtered events from API for selected month and returning as JSON."""
    if request.method == 'GET':
        url = 'https://rekrutacja.teamwsuws.pl/events/'
        response = requests.get(url=url, headers={'api-key': settings.API_KEY})
        events = []

        for event in response.json():
            event_month = datetime.fromisoformat(event.get('start_time')).month

            if event_month == selected_month:
                detail_url = f'{url}{event['id']}'
                detail_response = requests.get(url=detail_url, headers={'api-key': settings.API_KEY})

                events.append(detail_response.json())

        return JsonResponse({
            'success': 'Data Fetched',
            'events': events,
            }, status=200)

    return JsonResponse({'error': 'Bad Request'}, status=400)
