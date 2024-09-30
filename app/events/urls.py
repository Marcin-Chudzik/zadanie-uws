from django.urls import path
from events.views import monthly_view
from events.ajax_views import fetch_events_for_month

app_name = 'events'

urlpatterns = [
    path('monthly/', monthly_view, name='monthly_events'),

    # AJAX VIEWS
    path('fetch-events/<int:selected_month>/', fetch_events_for_month, name='fetch _events_for_month'),
]
