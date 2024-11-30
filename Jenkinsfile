pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-image"               // Name for your Docker image
        CONTAINER_NAME = "devops-container"       // Name for your Docker container
        DOCKER_HOST = "ec2-user@54.237.186.31"    // Your Docker EC2 public IP
    }



        stage('Checkout') {
             steps {
        // Use Username with Password credentials to clone the repository
                withCredentials([usernamePassword(credentialsId: 'github-pat', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
                sh '''
                git clone https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/NaodM/DevOps.git .
                 '''
        }
    }
}


        stage('Build Docker Image') {
            steps {
                script {
                    // SSH into the Docker host and build the Docker image
                    sshagent(['ec2-user']) { // Use the SSH credentials added in Jenkins (ID: ec2-user)
                        sh """
                            ssh -o StrictHostKeyChecking=no ${DOCKER_HOST} \\
                                "docker build -t ${IMAGE_NAME} /home/ec2-user/DevOps"
                        """
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // SSH into the Docker host and run the Docker container
                    sshagent(['ec2-user']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${DOCKER_HOST} \\
                                "docker run --name ${CONTAINER_NAME} -d ${IMAGE_NAME}"
                        """
                    }
                }
            }
        }

        stage('Application Test') {
            steps {
                script {
                    // SSH into the Docker host and test the running container
                    sshagent(['ec2-user']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${DOCKER_HOST} \\
                                "docker exec ${CONTAINER_NAME} curl http://localhost:8080 || true"
                        """
                    }
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    // SSH into the Docker host to stop and remove the container
                    sshagent(['ec2-user']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${DOCKER_HOST} \\
                                "docker stop ${CONTAINER_NAME} || true && docker rm ${CONTAINER_NAME} || true"
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline execution completed."
        }
    }
}
