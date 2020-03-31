pipeline {
  agent	 {
    label 'folio-jenkins'
  }
  stages {
    stage('build') {
      steps{
          sh "cp helper_scripts/* ."

          sh "chmod +x setup"
          sh "./setup"
          dir("rs_ui/platform-rs") {
            sh "yarn install"
            sh "yarn build output --okapi http://reshare.reshare-dev.indexdata.com:9130 --tenant millersville --sourcemap"
            sh "mv output output-millersville"
          }
      }
    }
  }
}