pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'todo-app'
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
                nodejs(nodeJSInstallationName: 'Node20') {
                    sh '''
                        npm install -g pnpm
                        pnpm install
                    '''
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                nodejs(nodeJSInstallationName: 'Node20') {
                    sh 'pnpm test'
                }
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
