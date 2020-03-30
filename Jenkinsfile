pipeline {
  agent	 {
    docker {
      image 'node:10.19.0'
    }
  }

  stages {
    stage('build') {
      steps{
        script{
          sh "mkdir ci"
          sh "${env.WORKSPACE}/helper_scripts/* ci/"
        }
        dir("${env.WORKSPACE}/ci") {
          script{
            sh "chmod +x setup"
            sh "yarn set registry https://repository.folio.org/repository/npm-ci-all"
            sh "yarn install"
            sh "yarn build output --okapi http://reshare.reshare-dev.indexdata.com:9130 --tenant millersville --sourcemap"
          }

        }
      }
    }
  }
}
