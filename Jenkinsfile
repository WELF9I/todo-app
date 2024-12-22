pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '-v /var/jenkins_home:/var/jenkins_home'
        }
    }
    
    environment {
        DOCKER_IMAGE = 'todo-app'
        HOME = '/var/jenkins_home'
        GIT_REPO_URL = 'https://github.com/WELF9I/todo-app.git'
        GIT_BRANCH = 'master'
    }
    
    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                git branch: env.GIT_BRANCH,
                    url: env.GIT_REPO_URL,
                    credentialsId: '1'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh '''
                npm install -g pnpm
                pnpm install
                '''
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'pnpm test'
            }
        }
        
        stage('Build') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
