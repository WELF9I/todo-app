pipeline {
    agent any
    
    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/yourusername/todo-app.git', branch: 'master'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Install pnpm globally if not already installed
                    sh 'npm install -g pnpm'
                    // Install project dependencies
                    sh 'pnpm install'
                }
            }
        }
        stage('Build Application') {
            steps {
                sh 'pnpm run build'  // Build the app using Vite
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Run docker-compose to build and start containers
                    sh 'docker-compose up --build -d'
                }
            }
        }
    }

    post {
        always {
            // Clean up after build (optional)
            sh 'docker-compose down'
        }
    }
}
