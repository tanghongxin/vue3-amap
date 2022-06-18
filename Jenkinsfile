pipeline {
    agent any
    options {
        timestamps()
    }
    environment {
        ONLINE_SITE = 'https://www.abyssal.site/vue3-amap'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'yarn'
                sh 'yarn build' 
            }
        }
        stage('Deploy') {
            steps {
                dir('/usr/share/nginx') {
                    sh 'rm -rf vue3-amap.back'
                    sh 'mv vue3-amap vue3-amap.back' 
                    sh 'mv ${WORKSPACE}/dist .'
                    sh 'mv dist vue3-amap'
                }
            }
        }
    }
    post {
        always {
            emailext body: "View on ${ONLINE_SITE}, See detail at ${BUILD_URL}",
                    recipientProviders: [developers(), requestor()],
                    subject: "Jenkins: ${JOB_NAME} ${GIT_BRANCH} build ${currentBuild.result}",
                    to: 'hongxin.tang@hotmail.com'
        }
    }
}
