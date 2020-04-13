@Library('indexdata-jsl@reshare-frontends') _

pipeline {
  agent	 {
    label 'folio-jenkins'
  }
  stages {
    stage("set env") {
      steps {
        constants()
      }
    }
    stage("rebuild frontends") {
      steps {
        idDevFrontend()
      }
    }
  }
}
