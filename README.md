# ETAMAX 2022
College Event Registration Website.
(used for Etamax-2022)

### Structure
| Folder | Description |
|:------:|:-----------:|
| backend| Django App (Rest API)|
| client | Next App (with SSR and SSG) |


### Branches

| Folder | Description |
|:------:|:-----------:|
| master | Main Branch which is deployed during registration |
| registrations-closed | Deploy when registration Closed |


### Deploy
#### Backend

-  Development
    Running the Project Locally
			1. clone the repository
      ```bash
      git clone https://github.com/rgab1508/ETAMAX-22.git
      cd FACES-21/
      ```
      2. Setting up a Virtual Env
      ```bash
      python -m virtualenv venv
      ```
      3. Activating Virtual Env
      ```bash
      .\venv\Scripts\activate (windows)
      or
      source venv/bin/activate (Linux)
      ```
      4. Installing Dependency
      ```bash
      cd backend/
      pip intall -r requirements.txt
      ```
      5. Applying migrations in Database
      _\*This project uses __Roll Number__ as the Primary key._
      ```bash
      python manage.py makemigrations
      ```
      6. Creating a Django Super User
      ```bash
      python manage.py createsuperuser
      ```
      7. Running the server
      ```bash
      python manage.py runserver
      ```
-  Production
  Deploying in a Virtual Private Server
      1. Setting up all the environment Variables required
			```bash
			export DJANGO_DEBUG=False
			export OTP_VERIFY_SECRET='<RANDOM_LONG_STRING>'				
			```

      2. Adding domain or IP in `backend/backend/setting.py`
			```python
			ALLOWED_HOSTS = ['127.0.0.1', '<UR_DOMAIN_OR_PUBLIC_IP>']
			```
      3. Setting up Database Conntection
      You can set Environment Variables for Database Credentials in the production Server (recomended)
			```bash
			export DB_NAME='<DATABASE_NAME>'
			export DB_USERNAME='<DATABASE_USERNAME>'
			export DB_PASSWORD='<DATABASE_PASSWORD>'
			```
			or edit this file
			```
			DATABASES = {
				'default': {
					'ENGINE': 'django.db.backends.postgresql_psycopg2',
					'NAME': os.getenv("DB_NAME"),
					'USER': os.getenv("DB_USERNAME"),
					'PASSWORD': os.getenv("DB_PASSWORD"),
					'HOST': 'localhost',
					'PORT': '',
				}
			}
			```
      4. Then you can perform Steps 1 to 6 from _Running the Project Locally_ Section
      5. Using [Gunicorn](https://docs.gunicorn.org/en/latest/deploy.html) to run server in Production
			you can follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04#create-a-gunicorn-systemd-service-file) for setting up gunicorn and nginx


### Frontend
  - Development
	Running locally

	```bash
	cd client/
	yarn
	yarn dev
	```
  - Production
  	Use production build to make website run faster
	```bash
	cd client/
	yarn
	yarn build
	yarn start
	```

### Nginx Config for running both apps in a Single Server

`sudo vim /etc/nginx/sites-availabe/website`
```
server {
	root /var/www/html;
	index index.html index.htm index.nginx-debian.html;

	server_name <DOMAIN_OR_PUBLIC_IP>;

	location /static {
		alias <PATH_TO_STATICFILES>
		# eg:  /home/<USERNAME>/ETAMAX-22/backend/staticfiles;
	}

	location /media {
		alias <PATH_TO_MEDIA>
		# eg: /home/<USERNAME>/ETAMAX-22/backend/media;
	}

	location /admin/ {
		include proxy_params;
		proxy_pass http://unix:/run/gunicorn.sock;
	}

	location /api/ {
		include proxy_params;
		proxy_pass http://unix:/run/gunicorn.sock;
	}


	location / {
		proxy_pass http://localhost:3000;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}
```