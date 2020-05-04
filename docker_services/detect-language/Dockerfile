FROM python:3
COPY src /home/application
WORKDIR /home/application
RUN pip install -r requirements.txt
EXPOSE 5000
ENTRYPOINT [ "python" ]

CMD ["main.py"]
