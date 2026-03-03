#!/bin/bash

echo "Updating ECS service..."

aws ecs update-service \
  --cluster streamflix-cluster \
  --service streamflix-service \
  --force-new-deployment \
  --region $AWS_REGION

echo "Deployment triggered successfully!"