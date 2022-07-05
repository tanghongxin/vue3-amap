pipeline {
    agent any
    options {
        timestamps()
    }
    environment {
        ONLINE_SITE = 'https://www.abyssal.site/vue3-amap'
        AUTHOR_EMAIL = 'hongxin.tang@hotmail.com'
        DEPLOY_DIR   = '/www/wwwroot/www'
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
                dir("${DEPLOY_DIR}") {
                    script {
                        if (fileExists('vue3-amap.back')) {
                            sh 'rm -rf vue3-amap.back'
                        }
                        if (fileExists('vue3-amap')) {
                            sh 'mv vue3-amap vue3-amap.back'
                        }    
                    }
                    sh 'mv ${WORKSPACE}/dist ./vue3-amap'
                }
            }
        }
    }
    post {
        always {
            emailext body: "View on ${ONLINE_SITE}, See detail at ${BUILD_URL}",
                    recipientProviders: [developers(), requestor()],
                    subject: "Jenkins: ${JOB_NAME} ${GIT_BRANCH} build ${currentBuild.result}",
                    to: "${AUTHOR_EMAIL}"
        }
    }
}
