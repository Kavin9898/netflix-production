pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        ACCOUNT_ID = "801195563235"
        ECR_REPO_PREFIX = "netflix-prod"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Kavin9898/netflix-production.git'
            }
        }

        stage('Configure AWS Credentials') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
                                  credentialsId: 'aws-credentials']]) {
                    sh 'aws sts get-caller-identity'
                }
            }
        }

        stage('Login to ECR') {
            steps {
                sh """
                aws ecr get-login-password --region ${AWS_REGION} | \
                docker login --username AWS --password-stdin \
                ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                """
    }
}

        stage('Build & Push Services') {
    steps {
        script {
            def services = [
                "auth-service",
                "movie-service",
                "recommendation-service",
                "notification-service"
            ]

            for (service in services) {

                sh """
                docker build -t ${ECR_REPO_PREFIX}-${service}:${IMAGE_TAG} services/${service}

                docker tag ${ECR_REPO_PREFIX}-${service}:${IMAGE_TAG} \
                ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_PREFIX}-${service}:${IMAGE_TAG}

                docker push \
                ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_PREFIX}-${service}:${IMAGE_TAG}
                """
            }
        }
    }
}

       stage('Build & Push Frontend') {
    steps {
        sh """
        docker build -t ${ECR_REPO_PREFIX}-frontend:${IMAGE_TAG} frontend

        docker tag ${ECR_REPO_PREFIX}-frontend:${IMAGE_TAG} \
        ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_PREFIX}-frontend:${IMAGE_TAG}

        docker push \
        ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_PREFIX}-frontend:${IMAGE_TAG}
        """
    }
}
        stage('Terraform Init') {
            steps {
                dir('infrastructure') {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('infrastructure') {
                    sh 'terraform apply -auto-approve'
                }
            }
        }
    }

    post {
        success {
            echo "🚀 Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
