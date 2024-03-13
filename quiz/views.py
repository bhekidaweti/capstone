from django.shortcuts import render
from django.http import JsonResponse
from .models import Country
import random

# Create your views here.

def quiz(request):
    countries = list(Country.objects.all())#list() converst the queryset to a python list
    # Select four random countries
    selected_countries = random.sample(countries, 4)
    # Select one correct country randomly
    correct_country = random.choice(selected_countries)
    return render(request, 'quiz/index.html', {'countries': selected_countries, 'correct_country': correct_country})

def get_next_questions(request):
    countries = list(Country.objects.all())
    # Select four random countries
    selected_countries = random.sample(countries, 4)
    # Select one correct country randomly
    correct_country = random.choice(selected_countries)
    
    # Construct a list of dictionaries containing the question data
    questions_data = []
    for country in selected_countries:
        question_data = {
            'country_name': country.name,
            'flag_url': country.flag.url  # Assuming flag is a FileField
        }
        questions_data.append(question_data)

    # Shuffle the questions so that the correct answer appears randomly
    random.shuffle(questions_data)

    # Include the correct country in the questions data
    correct_country_name = correct_country.name
    questions_data_with_correct_country = {
        'correct_country_name': correct_country_name,
        'questions': questions_data
    }

    # Return the questions data in JSON format
    return JsonResponse(questions_data_with_correct_country)
   
def howto(request):
    return render(request, 'quiz/howto.html', {})