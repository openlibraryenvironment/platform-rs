pipeline {
  agent	 {
    docker {
      image 'node:10.10.0'
    }
  }

  stages {
    stage('build') {
      steps{
        script{
                sh 'yarn --version'
        }
      }
    }
  }
}
