docker build -t complimentgeneratorapi .

docker run -d -p 8080:80 --name complimentcontainer complimentgeneratorapi


http://localhost:8080/api/compliment


@labvel:registry=https://pkgs.dev.azure.com/DevSecOpsLabvel/_packaging/PlarformEngieering/npm/registry/ 
registry=https://registry.npmjs.com              
always-auth=true
#registry=https://platform-engineering-155794986228.d.codeartifact.us-east-2.amazonaws.com/npm/Labvel-npm/           