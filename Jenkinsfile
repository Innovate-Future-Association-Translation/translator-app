pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    tools {
        nodejs 'NodeJS_20' // 你需要在 Jenkins 全局工具配置里定义这个 Node 版本
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'  // 或 npm install，推荐 ci 用于 CI 环境
            }
        }

        stage('Build') {
            steps {
                echo 'Building Next.js project...'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // 如果你有测试命令，比如 jest，可替换下面命令
                // sh 'npm run test || echo "No tests defined."'
            }
        }

        stage('Deploy') {
            when {
                branch 'main' // 只在 main 分支构建时部署
            }
            steps {
                echo 'Deploy step placeholder...'
                // 这里可以换成部署到服务器的命令，比如 rsync / scp / docker run
            }
        }
    }

    post {
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
