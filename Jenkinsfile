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
    stage('upload') {
      steps {
        // drafts for shared libaries
        sh "pwd"
        // create bucket if does not exist
        withAWS(credentials: 'indexdata-dev', region: 'us-east-1') {
          sh 'aws iam get-user'
        }
        // create folder for reshare frontends
        // make cf distro
      }
    }
  }
}
