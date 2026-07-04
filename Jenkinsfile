pipeline {

    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm

                sh '''
                    pwd
                    ls -al
                '''
            }
        }

        stage('Docker Compose Build') {
            steps {
                sh '''
                    set -e

                    docker compose -f ${COMPOSE_FILE} build --no-cache
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    set -e

                    docker compose -f ${COMPOSE_FILE} down || true
                    docker compose -f ${COMPOSE_FILE} up -d --build

                    echo "===== Container Status ====="
                    docker compose -f ${COMPOSE_FILE} ps
                '''
            }
        }

        stage('Database Migration') {
            steps {
                sh '''
                    set -e

                    echo "===== Backend Logs ====="
                    docker compose -f ${COMPOSE_FILE} logs backend --tail=50 || true

                    docker compose -f ${COMPOSE_FILE} exec -T backend \
                    python manage.py migrate
                '''
            }
        }

        stage('Collect Static') {
            steps {
                sh '''
                    set -e

                    docker compose -f ${COMPOSE_FILE} exec -T backend \
                    python manage.py collectstatic --noinput
                '''
            }
        }

        stage('Container Status') {
            steps {
                sh '''
                    echo "========== Containers =========="

                    docker compose -f ${COMPOSE_FILE} ps

                    echo ""
                    echo "========== Backend =========="
                    docker compose -f ${COMPOSE_FILE} logs backend --tail=50 || true

                    echo ""
                    echo "========== Frontend =========="
                    docker compose -f ${COMPOSE_FILE} logs frontend --tail=30 || true

                    echo ""
                    echo "========== PostgreSQL =========="
                    docker compose -f ${COMPOSE_FILE} logs postgres --tail=30 || true

                    echo ""
                    echo "========== Nginx =========="
                    docker compose -f ${COMPOSE_FILE} logs nginx --tail=30 || true
                '''
            }
        }
    }

    post {

        success {
            echo '==========================================='
            echo '🎉 Django + React 배포가 완료되었습니다.'
            echo '==========================================='
        }

        failure {

            sh '''
                echo "========== Container Status =========="
                docker compose -f ${COMPOSE_FILE} ps || true

                echo ""
                echo "========== Backend =========="
                docker compose -f ${COMPOSE_FILE} logs backend --tail=100 || true

                echo ""
                echo "========== PostgreSQL =========="
                docker compose -f ${COMPOSE_FILE} logs postgres --tail=100 || true

                echo ""
                echo "========== Nginx =========="
                docker compose -f ${COMPOSE_FILE} logs nginx --tail=100 || true
            '''

            echo '==========================================='
            echo '❌ 배포에 실패했습니다.'
            echo '==========================================='
        }

        always {

            sh '''
                docker image prune -f || true
            '''

            echo 'Pipeline 종료'
        }
    }
}