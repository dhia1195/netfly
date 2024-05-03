pipeline {
    agent any

    environment {
        registryCredentials = "nexus"
        registry = "192.168.56.130:8083"
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start application') {
            steps {
                sh 'npm install mongoose'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'scanner'
                    withSonarQubeEnv {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Docker build') {
            steps {
                sh 'docker build -t dhia2204/pidev:1.0.0 .'
            }
        }

        stage('Docker push') {
            steps {
                sh '''
                    docker login -u dhia2204 -p dhiaboudali
                    docker push dhia2204/pidev:1.0.0
                '''
            }
        }

        stage('Pull Docker image') {
            steps {
                script {
                    docker.image('dhia2204/pidev:1.0.0').pull()
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
