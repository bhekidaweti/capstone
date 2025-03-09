# Flag Quiz Django Project
This app tests users' knowledge of world flags by having them match a flag image with a randomly provided country name.

-Users must select the correct flag within a specific time limit (e.g., 15 seconds).
-If the user fails to click a flag within the time limit, no points are awarded.
-Clicking the correct flag within the time limit adds one point to the scoreboard.
-Clicking an incorrect flag resets the game to the beginning.

## Stack

Backend: Django (with models to store flags and game logic).
Frontend: Django templates and vanilla JavaScript for interactive flag matching.
Styling: Basic CSS for UI presentation.

## Features

-Timed flag selection to challenge users' speed and knowledge.
-Score tracking to measure progress.
-Randomized flag display to ensure varied gameplay.
-Restart mechanism upon incorrect selection.

## Deployment & Challenges

The app was initially deployed on AWS, but due to affordability concerns, 
I decided to rebuild it as a React version with the same core functionality.
 repo for React version `https://github.com/bhekidaweti/flag-quiz-json`

One of the biggest technical challenges I faced was handling static files during deployment.
Unlike JavaScript-based projects, where files are primarily treated as static assets, 
Django requires special handling for static files on cloud providers. 
Configuring storage backends, managing collectstatic, and ensuring proper static file serving across different hosting environments
 (e.g., AWS, Netlify, or alternative providers) was a significant hurdle.

## Future Improvements
-First work on my Django deployment skills and continue to work on the Django verson of the app as well.
-Adding a leaderboard to track high scores.
-Implementing difficulty levels (e.g., Easy, Medium, Hard).
-Enhancing UI/UX with animations and better styling.
-Introducing a multiplayer mode for competitive gameplay.

## Accesing the project locally
To test my project locally, you can follow these steps:

1. Clone the repository to your local machine.
   ```
     git clone https://github.com/bhekidaweti/capstone.git
   ```
2. Navigate to the project directory.
   ```
     cd capstone
   ```   
3. Install the required Python packages listed in requirements.txt using pip:
   ```
     pip install -r requirements.txt
   ```
4. Run the Django development server:
 ```
   python manage.py runserver
   ```
5. Access the application in your web browser at http://localhost:8000.
