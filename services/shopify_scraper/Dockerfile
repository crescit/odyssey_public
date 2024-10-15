FROM python:3
RUN apt-get update -y && apt-get install -y python-pip python-dev
COPY ./requirements.txt /app/requirements.txt
COPY ./shopify_scraper.py /app/shopify_scraper.py
WORKDIR /app
RUN pip install -r requirements.txt
RUN mkdir -p /var/scraped_images
RUN mkdir -p /var/uploads
RUN mkdir -p /templates
COPY . /app
#ENTRYPOINT [ "python" ]
#CMD [ "server.py" ]
ENV FLASK_APP=odyssey_scraper
CMD ["flask", "run", "--host", "0.0.0.0"]