# zadanie-uws
Zadanie rekrutacyjne na Junior Fullstack Developer dla UWS

# Event Calendar Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Testing](#testing)
- [Docker Setup](#docker-setup)
- [Accessibility Compliance](#accessibility-compliance)
- [API Details](#api-details)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This is a calendar application built with Django, providing a platform for viewing events. It includes a monthly calendar view with functionalite to check the details of each event. The application fetches events data from a custom API.

## Features
- **Monthly Calendar View**: Easily browse events planned for a specific month.
- **Event Details**: Click on an event to view its details, including time, duration, and location.
- **API Integration**: Events are fetched dynamically from a provided REST API.
- **Full Responsive**: Application is styled to be reponsive on devices from mobile to desktop.

## Technologies
- **Backend**: Django 5
- **Frontend**: Bootstrap 5, HTML5, CSS3, JavaScript
- **API**: Integration with external REST API for event data
- **Database**: SQLite3
- **Containerization**: Docker

## Setup Instructions

### Prerequisites
- Python 3.12
- Docker

### Steps to Run the Application

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Marcin-Chudzik/zadanie-uws.git
   cd zadanie-uws
2. **Setup the environment variables in docker-compose.yml file (example below)**:
   ```bash
   SECRET_KEY=12e01d20129kds9ks2k1s0d9fkadsad01-2d
   DEBUG=True
   ALLOWED_HOSTS=*
   API_KEY=correct-api-key
3. **Build and run Docker app container with followed command**:
   ```bash
   docker-compose up --build
4. **Open web app in browser under link below**:
   <br><http://127.0.0.1:8000/events/monthly/>
