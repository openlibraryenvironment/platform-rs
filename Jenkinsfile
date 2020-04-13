@Library('indexdata-jsl') _
def id = new com.indexdata.idCommands()

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
          sh "yarn build output --okapi https://east-okapi.folio-dev.indexdata.com --tenant reshare_east --sourcemap"
          sh "mv output east"
          sh "yarn build output --okapi https://west-okapi.folio-dev.indexdata.com --tenant reshare_west --sourcemap"
          sh "mv output west"
        }
      }
    }
    stage('upload') {
      steps {
        dir("rs_ui/platform-rs") {
          script {
            withAWS(credentials: 'indexdata-dev', region: 'us-east-1') {
              // create bucket if does not exist
              check_bucket = id.checkBucketExists('reshare-bundles')
              if (!check_bucket) {
                id.createPublicBucket('reshare-bundles')
              }
              id.syncBucket('reshare-bundles', 'east', 's3://reshare-bundles/east')
              id.syncBucket('reshare-bundles', 'west', 's3://reshare-bundles/west')
            }
          }
        }
      }
    }
  }
}
