# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Django 6 + Tailwind CSS v4 + DaisyUI project with Django REST Framework, GraphQL (Graphene-Django), django-allauth authentication, and Daphne ASGI server.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Django 6.0.3 |
| CSS | Tailwind CSS v4 + DaisyUI v5 (via `@tailwindcss/postcss`) |
| Asset Pipeline | django-compressor + django-libsass (SCSS compilation) |
| API | Django REST Framework + dj-rest-auth |
| GraphQL | Graphene-Django (endpoint: `/graphql/`) |
| Auth | django-allauth + django-recaptcha |
| ASGI | Daphne |
| i18n | Django's i18n with country flag emojis |
| Package Manager | `uv` |

## Development Commands

```bash
# Install dependencies
uv sync

# Run dev server (uses Daphne for ASGI/Channels)
python manage.py runserver

# Tailwind CSS rebuild (required after template changes)
cd theme/static_src && npm run build

# Tailwind dev mode (watch for changes)
cd theme/static_src && npm run dev

# Django shell
python manage.py shell

# Run tests
python manage.py test

# Compression (offline)
python manage.py compress --force

# Migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py shell -c "import getpass; password = getpass.getpass('Password:'); from django.contrib.auth.models import User; User.objects.create_superuser('Admin', 'admin@example.com', password)"

# Verify superuser email
python manage.py shell -c "from profiles.models import Profile; u=Profile.objects.get(pk=1); u.email_verified=True; u.save()"
```

## Architecture

### Settings Structure
Settings are modular in `django_daisyui/settings/`:
- `base.py` — Core settings shared across all environments
- `env_vars.py` — Environment variable loading via `django-environ`
- Environment-specific: `environments/development.py`, `container.py`, `virtualmachine.py`

ASGI selects settings via `DJANGO_ENVIRONMENT` env var.

### App Structure
- `django_daisyui/` — Project config (settings, urls, wsgi, asgi)
- `api/` — REST API endpoints and serializers
- `book_graphql/` — GraphQL schema (Graphene-Django)
- `chat/` — WebSocket chat (currently disabled/commented)
- `profiles/` — User profiles with avatar support
- `tenants/` — Multi-tenancy app
- `templates/` — HTML templates using DaisyUI components

### Tailwind v4 Build Pipeline
- Source: `theme/static_src/src/styles.css`
- Output: `theme/static/css/dist/styles.css`
- DaisyUI v5 uses Tailwind v4's `@plugin` syntax, not a separate config
- Template scanning: `@source "../../../**/*.{html,py,js}"` scans all Django templates

### Authentication Flow
django-allauth → dj-rest-auth for REST API. Auth backends in `settings/allauth.py`:
1. `ModelBackend` (Django admin login)
2. `allauth.account.auth_backends.AuthenticationBackend` (email login)

## DaisyUI Patterns

### Theme Toggle
```html
<input type="checkbox" class="theme-controller" value="dark" />
```
The `data-theme` attribute on `<html>` controls the active theme.

### Key Components Used
- Navbar: `navbar sticky top-0 bg-base-100 z-10 shadow-md`
- Drawers: `drawer xs:drawer-open` with checkbox toggle
- Buttons: `btn btn-primary`, `btn btn-ghost`, `btn btn-circle`
- Alerts: `alert alert-success/error/warning/info`
- Menus: `menu menu-horizontal` with `<details><summary>`
- Forms: Crispy forms via `crispy_daisyui` template pack

## Environment Variables

See `django_daisyui/settings/local.env` (not committed) or `.env`:
- `SECRET_KEY`, `DATABASE_URL`, `ALLOWED_HOSTS`
- `RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`
- `GOOGLE_AUTH_CLIENT_ID`, `GOOGLE_AUTH_SECRET`
- `DJANGO_ENVIRONMENT` = Development | Container | VirtualMachine

## Common Issues

1. **Tailwind CSS not updating**: Run `npm run build` in `theme/static_src/`
2. **SCSS not compiling**: Ensure `django-libsass` is installed; `COMPRESS_PRECOMPILERS` maps `text/x-scss` to `django_libsass.SassCompiler`
3. **DaisyUI theme not switching**: Check `data-theme` on `<html>` and `theme-controller` class on toggle checkbox
4. **CSRF errors with AJAX**: Include `{% csrf_token %}` in forms

## Code Style

Python code is linted with **pylint** and HTML/Django templates with **djlint**.

```bash
# Lint Python
pylint profiles/ api/ book_graphql/

# Lint templates
djlint templates/ --check

# Format / fix lint issues
djlint templates/ --reformat
```

Key linting tools in `dev` dependency group:
- `pylint==4.0.5`
- `djlint==1.36.4` (Django template linter)
- `django-browser-reload==1.21.0` (auto-reload on template changes)

## External Resources
- [DaisyUI Components](https://daisyui.com/components/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/)
- [Django-Tailwind](https://django-tailwind.readthedocs.io/)
