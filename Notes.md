docker build -t complimentgeneratorapi .

docker run -d -p 8080:80 --name complimentcontainer complimentgeneratorapi


http://localhost:8080/api/compliment