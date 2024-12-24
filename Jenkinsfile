pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE = 'docker-compose'
        NODE_VERSION = '20.x'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/WELF9I/todo-app.git', 
                    branch: 'master'
            }
        }
        
        stage('Setup Node') {
            steps {
                nodejs(nodeJSInstallationName: NODE_VERSION) {
                    sh 'npm install -g pnpm'
                }
            }
        }
        
        stage('Install') {
            steps {
                nodejs(nodeJSInstallationName: NODE_VERSION) {
                    sh 'pnpm install'
                }
            }
        }
        
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: NODE_VERSION) {
                    sh 'pnpm build'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                    ${DOCKER_COMPOSE} down || true
                    ${DOCKER_COMPOSE} build
                    ${DOCKER_COMPOSE} up -d
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