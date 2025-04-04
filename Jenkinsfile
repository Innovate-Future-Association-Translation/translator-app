pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    tools {
        nodejs 'NodeJS_20' // 请确保已在 Jenkins 全局工具配置里定义
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh '''
                    npm install
                    npm install --save-dev typescript @types/react @types/node
                '''
            }
        }

        stage('Build') {
            steps {
                echo '🏗️ Building Next.js project...'
                sh '''
                    npm run build
                '''
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                // 如果你没有 test 脚本，可留空或跳过
                // sh 'echo "No tests defined."'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo '🚀 Deploying to /var/www/html...'
                sh '''
                    sudo rm -rf /var/www/html/*
                    sudo cp -r .next/static /var/www/html/
                    sudo cp -r public/* /var/www/html/
                    sudo cp -r out/* /var/www/html/ || true
                    sudo cp -r build/* /var/www/html/ || true
                    echo "✅ Deployment complete."
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Build & Deploy succeeded!'
        }
        failure {
            echo '❌ Build failed. Check logs above for details.'
        }
    }
}
