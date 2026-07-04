pipeline {

    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                sh 'pwd'
                sh 'ls -al'
            }
        }

        stage('Docker Compose Build') {
            steps {
                sh """
                    docker compose -f ${COMPOSE_FILE} build --no-cache
                """
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    docker compose -f ${COMPOSE_FILE} down || true
                    docker compose -f ${COMPOSE_FILE} up -d --build
                """
            }
        }

        stage('Database Migration') {
            steps {
                sh """
                    docker compose -f ${COMPOSE_FILE} exec -T backend python manage.py migrate
                """
            }
        }

        stage('Collect Static') {
            steps {
                sh """
                    docker compose -f ${COMPOSE_FILE} exec -T backend python manage.py collectstatic --noinput
                """
            }
        }

        stage('Container Status') {
            steps {
                sh """
                    docker compose -f ${COMPOSE_FILE} ps
                """
            }
        }
    }

    post {
        success {
            echo '======================================'
            echo '배포가 성공적으로 완료되었습니다.'
            echo '======================================'
        }

        failure {
            echo '======================================'
            echo '배포에 실패했습니다.'
            echo '======================================'
        }

        always {
            sh 'docker image prune -f || true'
            echo 'Pipeline 종료'
        }
    }
}