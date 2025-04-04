pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    tools {
        nodejs 'NodeJS_20' // 请确保在 Jenkins Global Tool 配置中存在此版本
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build with Export') {
            steps {
                echo '🔧 Building & Exporting static site...'
                sh 'npm run build'
            }
        }

        stage('Deploy to /var/www/html') {
            when {
                branch 'main'
            }
            steps {
                echo '🚀 Deploying static site to /var/www/html...'
                sh '''
                    sudo rm -rf /var/www/html/*
                    sudo cp -r out/* /var/www/html/
                    echo "✅ Static site deployed successfully."
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Build and Deploy succeeded!'
        }
        failure {
            echo '❌ Build or Deploy failed. Check logs for details.'
        }
    }
}
