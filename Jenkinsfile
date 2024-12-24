pipeline {
    agent any
    
    environment {
        DOCKER_PATH = tool 'docker'
        PATH = "${DOCKER_PATH}/bin:${env.PATH}"
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/WELF9I/todo-app.git'
            }
        }
        
        stage('Build') {
            steps {
                sh '''
                    cd todo-app
                    docker build -t my-react-app .
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
        
        stage('Test') {
            steps {
                sh '''
                    cd todo-app
                    docker exec $(docker ps -qf "name=todo-app") pnpm test
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}