pipeline {
    agent any
    
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/WELF9I/todo-app.git'
            }
        }
        
        stage('Build') {
            steps {
                dir('todo-app') {
                    sh 'docker build -t my-react-app .'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
        
        stage('Test') {
            steps {
                sh 'pnpm test'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
