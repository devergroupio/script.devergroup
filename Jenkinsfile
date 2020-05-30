if(env.BRANCH_NAME ==~ /^PR-.*|master/) {
    node('worker') {
        stage('checkout') {
            checkout scm
        }
        stage('install_package') {
            docker.image('node:12.16.3').inside {
                    sh "npm install"
                }
        }

        stage('type_check') {
          docker.image('node:12.16.3').inside {
            sh "npm run typecheck"
            sh "npm run tsc"
          }
        }

        stage('unit_test') {
          docker.image('node:12.16.3').inside {
              configFileProvider([configFile(fileId: 'dv_core.dev.env', variable: 'ENV_FILE')]) {
                    sh "mkdir -p ./.environments"
                    sh "cp -rf $ENV_FILE ./.environments/dev.env"
              }
              sh "npm run test"
          }
        }

        // if(env.BRANCH_NAME == 'master') {
        //   stage('build') {
        //         docker.image('node:10.17.0').inside {
        //           sh "npm run build"
        //         }
        //       }
        // }
    }
}

if(env.BRANCH_NAME == 'master') {
  node('production_instagram') {
    checkout scm
    configFileProvider([configFile(fileId: 'dv_core.slave.env', variable: 'ENV_FILE')]) {
                    sh "mkdir -p ./.environments"
                    sh "cp -rf $ENV_FILE .environments/prod.env"
    }
    sh "chmod +x scripts/deploy.slave.sh"
    // sh "./scripts/deploy.slave.sh"
    // sh "docker-compose -f docker-compose.slave.yml up -d"
  }

  node ('master') {
    checkout scm
    configFileProvider([configFile(fileId: 'dv_core.prod.env', variable: 'ENV_FILE')]) {
                    sh "mkdir -p ./.environments"
                    sh "cp -rf $ENV_FILE .environments/prod.env"
    }
    sh "chmod +x scripts/deploy.sh"
    sh "./scripts/deploy.sh"
    sh "docker-compose -f docker-compose.prod.yml up -d"
  }
}
