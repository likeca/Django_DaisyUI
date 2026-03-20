# UV
```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh
wget -qO- https://astral.sh/uv/install.sh | sh

# Github Action
sudo ln -s /home/ubuntu/.local/bin/uv /usr/local/bin/uv

# Setup virtual environment
uv sync
```

## Async views
- For the function-based view, declaring the whole view using "async def"
- For the class-based view, declaring the HTTP method handlers, such as "async def get()" and "async def post()"

## Queries & the ORM
```bash
async for author in Author.objects.filter(name__startswith="A"):
   book = await author.books.afirst()
```

# Setup Django virtual environment

## Windows
```bash
python -m venv .venv
.venv\Scripts\activate
python -m pip install pip --upgrade
pip install -r requirements\development.txt
pip install -r requirements\production.txt
```

## MacOS,Linux
```bash
python3 -m venv .venv
. venv/bin/activate
python -m pip install pip --upgrade
pip install -r requirements/development.txt
pip install -r requirements/production.txt
```

## Features
- Ready Bootstrap-themed pages
- User Registration/Sign up
- Better Security with [12-Factor](http://12factor.net/) recommendations
- Logging/Debugging Helpers
- Works on Python 3 and Django 2

# {{ project_name }}
!!! project name CAN NOT use '-' due to python conflict

## Installation
1. Change project name and django_tw folder name

### Quick start
To set up a development environment quickly, first install Python 3. It
comes with virtualenv built-in. So create a virtual env by:
    1. `$ python3 -m venv {{ project_name }}`
    2. `$ python -m pip install --upgrade pip`
    3. `$ . {{ project_name }}/bin/activate`

Install all dependencies:

    pip install -r requirements.txt

Run migrations: # Update database change scripts
python manage.py makemigrations

    # Update database change
    python manage.py migrate

    # Create superuser
    python manage.py createsuperuser

# Production Deployment
daphne myproject.asgi:application

# django-allauth Google Authenticate
https://www.youtube.com/watch?v=NG48CLLsb1A
https://developers.google.com/gmail/api/quickstart/js
https://console.developers.google.com/
[PO File Translate](https://pofile.net/free-po-editor)

# Django create app add to project
```bash
(venv)$ python manage.py startapp <new_app>
```

# Update Table (Drop Table Method)
## Method 1:
1. Delete application relate tables and data
   $ python manage.py migrate registrationform zero
2. Recreate Table
   $ python manage.py ./manage.py migrate

## Method 2:
1. Export Data from Workbench (Data Only)
2. Update exported data
3. Drop Table from database
4. Update Drop Table status in Django
   $ python manage.py ./manage.py migrate --fake [table_name] zero
5. Recreate Table
   $ python manage.py ./manage.py migrate

# Django SEO
The ping_google() command only works if you have registered your site with Google Webmaster Tools.
Registered your site with Google Webmaster Tools.
[Google Search Console](https://www.google.com/webmasters/tools/)
```bash
python manage.py ping_google
```

# Daphne
daphne django_tw.asgi:application

# Django Auto Translate - django-autotranslate
```bash
# Translate language
python manage.py makemessages -a
python manage.py makemessages -l fr
python manage.py makemessages -l zh_Hans

# Compile language po for production
python manage.py compilemessages -l fr -l zh_Hans

# django-autotranslate (User custom version)
python manage.py translate_messages -u -f
python manage.py compilemessages
```

# gettext() vs gettext_lazy()
## Use gettext_lazy() in forms or models
In definitions like forms or models you should use gettext_lazy because the code of this definitions is only executed once (mostly on django's startup);

## use gettext()) in view
In views and similar function calls you can use gettext without problems, because everytime the view is called gettext will be newly executed, so you will always get the right translation fitting the request!

# Provide initial data
python manage.py loaddata api/books.json


# Generating an OpenAPI Schema
```bash
python manage.py generateschema --file static/site/openapi/schema.yaml
```

# Google Login "Invalid id_token"
django-allauth==0.50.0
dj-rest-auth==4.0.1    




# Django Create Superuser and update site
```bash
# python manage.py createsuperuser (Manual)

python manage.py makemigrations
python manage.py migrate

python manage.py shell -c "import getpass; password = getpass.getpass('Password:'); from django.contrib.auth.models import User; User.objects.create_superuser('Admin', 'admin@example.com', password)"

python manage.py shell
from profiles.models import Profile
superuser = Profile.objects.get(pk=1)
superuser.email_verified = True
superuser.save()
from allauth.account.models import EmailAddress
superuser = EmailAddress(email='admin@example.com', verified=True, primary=True, user_id=1)
superuser.save()

from django.contrib.sites.models import Site
site = Site.objects.all()[0]
site.domain = "example.com"
site.name = "Local Home Contractor Hub"
site.save()
exit()

python manage.py loaddata categories
python manage.py loaddata canada_cities.yaml

# Add Tags for test
from profiles.models import Profile
user = Profile.objects.get(pk=2)
user.tags.all()
user.tags.add("Artisans & Crafts", "Childcare & Nanny")

```

# Django Load Data
```bash
python manage.py help cities_light
python manage.py cities_light
python manage.py cities_light --force-import-all

python manage.py loaddata categories
python manage.py loaddata canada_cities.yaml
```

# Django Dump data 
```bash
python manage.py dumpdata auth.user --format yaml > user.yaml
python manage.py dumpdata profiles --format yaml > profiles.yaml

python manage.py dumpdata cfs.CFSColor --format yaml > cfs_colors.yaml
python manage.py dumpdata products.price --format yaml > prices.yaml
```

# Test SendEmail
```bash
python manage.py shell

>>> from dharro.utils import SendEmail
>>> SendEmail('test', 'test')
```



# Squash Migration
```bash
# Apply all change to DB
python manage.py migrate

# for debug_toolbar
export DJANGO_ENVIRONMENT=Development
python manage.py migrate

# Squash merge from 0003_faqcategory_order (last migration) to 0002_faqcategory_faqs
python manage.py squashmigrations products 0002_faqcategory_faqs 0003_faqcategory_order

# Delete migrations and rename squash migrations to 
0002_squash_0002_faqcategory_faqs.py -> 0002_faqcategory_faqs.py

# Validate the squash merge migraiton
python manage.py makemigration
python manage.py migrate

# Show migration
python manage.py showmigrations
```

# Django Tailwind
[Django-Tailwind](https://django-tailwind.readthedocs.io/en/latest/)
```bash
# Create a Tailwind CSS compatible Django app "theme"
python manage.py tailwind init

# Install Tailwind CSS dependencies - cross-env
python manage.py tailwind install

# Start only the Tailwind watcher, also need to run "python manage.py runserver"
python manage.py tailwind start

# Create a production build
python manage.py tailwind build

# Check if there are any updates
python manage.py tailwind check-updates

# Update to latest version of Tailwind CSS
python manage.py tailwind update
```

# Icons
[Heroicons](https://heroicons.com/)

# DaisyUI
[DaisyUI Component](https://daisyui.com/components/)
[aisyUI Components](https://willpinha.github.io/daisy-components/)

# Django DaisyUI
https://github.com/hypy13/django-daisy


Daisy UI Admin Dashboard Template
https://github.com/robbins23/daisyui-admin-dashboard-template
https://github.com/robbins23/admin-dashboard-nextjs-typescript-daisyui-template?tab=readme-ov-file

# DaisyUI Icons
https://heroicons.com/outline