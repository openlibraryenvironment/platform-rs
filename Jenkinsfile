@Library('indexdata-jsl@reshare-frontends') _

pipeline {
  agent	 {
    label 'folio-jenkins'
  }
  stages {
    stage("rebuild frontends") {
      steps {
        idDevFrontend()
      }
    }
  }
}
