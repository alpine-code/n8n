docker buildx build --platform linux/amd64 -t 957690576967.dkr.ecr.eu-west-1.amazonaws.com/n8n-custom -f docker/images/n8n-custom/Dockerfile .
docker tag 957690576967.dkr.ecr.eu-west-1.amazonaws.com/n8n-custom:latest 957690576967.dkr.ecr.eu-west-1.amazonaws.com/n8n-custom:2
docker push 957690576967.dkr.ecr.eu-west-1.amazonaws.com/n8n-custom:2

docker volume create n8n_custom_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e DB_TYPE=postgresdb \
 -e DB_POSTGRESDB_DATABASE=n8n \
 -e DB_POSTGRESDB_HOST=hurricane-01-instance-1.ciflcdlz0b6m.eu-west-1.rds.amazonaws.com \
 -e DB_POSTGRESDB_PORT=5432 \
 -e DB_POSTGRESDB_USER=n8n \
 -e DB_POSTGRESDB_SCHEMA=public \
 -e DB_POSTGRESDB_PASSWORD=4J9dL5X3S7bE8hC0P9V2W4YLF2mG1T3K6DBQcN3P \
 -v n8n_custom_data:/home/node/.n8n \
n8n-custom

AKIAVYINTLCTJNQAISFM
tPAVUXEy2zmB6WtwinB7FBKxV9NAFI+5FfqwxHHg