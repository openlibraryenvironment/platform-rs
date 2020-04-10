@Library('indexdata-jsl') _
def id = new com.indexdata.s3commands()

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
          sh "mv output millersville"
        }
      }
    }
    stage('upload') {
      steps {
        script {
          withAWS(credentials: 'indexdata-dev', region: 'us-east-1') {
            // create bucket if does not exist
            check_bucket = id.checkBucketExists('reshare-bundles')
            if (!check_bucket) {
              id.createPublicBucket('reshare-bundles')
            }
            id.syncBucket('reshare-bundles', 'millersville', 's3://reshare-bundles/millersville')
          }
        }
        script {
          echo 'make cf distro placeholder'
        }
      }
    }
  }
}
