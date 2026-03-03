#!/bin/bash

echo "Logging into ECR..."

aws ecr get-login-password --region $AWS_REGION | \
docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

echo "Building Docker image..."

docker build -t $ECR_REPO .

docker tag $ECR_REPO:latest $IMAGE_URI

echo "Pushing Docker image..."

docker push $IMAGE_URI

echo "Docker image pushed successfully!"