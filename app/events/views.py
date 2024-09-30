from django.shortcuts import render


def monthly_view(request):
    """Monthly events view."""
    return render(request, 'events/monthly_view.html')
