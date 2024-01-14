FROM python:3.8-slim

RUN pip install --upgrade pip

RUN pip install pipenv

WORKDIR /app

COPY Pipfile Pipfile.lock ./

RUN pipenv install --system

COPY . .

COPY entrypoint.sh .

ENTRYPOINT ["sh", "/app/entrypoint.sh"]