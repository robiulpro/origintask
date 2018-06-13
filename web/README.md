Task List App
=============

Simple multiuser task list app for organisation.

Live Demo: [https://origintaskrob.herokuapp.com](https://origintaskrob.herokuapp.com)

Tech Stack
----------

### Backend

*   Python
*   Django
*   Django rest framework

### Frontend

*   React
*   Webpack
*   Redux
*   Material UI

Setup
-----

1.  Create a python3 virtual environment, activate the environment
2.  cd into virtual environment and clone the repo
3.  Make sure you have 'pip' installed, if not please install it first
4.  cd into cloned directory and run: 'pip install -r requirements.txt'
5.  To start the server, run: 'python manage.py runserver', by default the server will run on port 8000
6.  Open your browser and go to 'http://localhost:8000'

For frontend (continious development)
-------------------------------------

1.  Install latest 'nodejs' and 'npm'
2.  cd into '\[cloned directory\]/web'
3.  Run: 'npm install' to install node packages
4.  Run: 'npm start' to start the development server
5.  Go to http://localhost:3000 (make sure the django server is running)
6.  To make a production build, Run: 'npm build', this will copy the minified css/js to respective folders. You can test the build by pointing your browser to 'http://localhost:8000'

Deploy to heroku
----------------

1.  Install heroku cli
2.  #heroku login
3.  #heroku create \[appname\]
4.  In 'Procfile', replace the appname with the appname created
5.  #heroku git:remote -a \[appname\]
6.  #git add .
7.  #git commit -m \[message\]
8.  #git push heroku master