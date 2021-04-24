pipeline {
  agent any
  options {
    timestamps()
    timeout(10)
  }
  stages {
    stage('Git pull') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: '*/feature-email']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/MelbrisadeJR/CRM-System-Front-End.git']]])
      }
    }
    stage('npm build') {
      steps {
        nodejs('Node-CRM') {
        }
        sh "npm install"
        sh "npm run build"
        }
    }
    stage('Result') {
      steps {
        nodejs('Node-CRM') {
        }
        sh "npm start"
        }
    }
  }
}