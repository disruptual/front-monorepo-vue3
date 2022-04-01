const fs = require('fs-extra');
const path = require('path');
const projects = require('../projects.json');

const jenkinsFilePath = path.join(process.cwd(), 'Jenkinsfile');

const generateBlock = ({ projectName, envName, branch, ip, sshArguments }) => `
stage ('ADMIN ${projectName} Deployment ${envName}') {
    when {
        branch '${branch}'
    }
    steps{
        sshagent(credentials : ['${projectName}_${envName}']) {
            sh """ssh -v ${sshArguments} ubuntu@${ip} << EOF
            cd /home/ubuntu/api/app/back/files &&
            git reset HEAD --hard &&
            git checkout ${branch} &&
            git pull origin ${branch} &&
            cd /home/ubuntu/api &&
            docker-compose up -d --build back &&
            exit
            EOF
            """
        }
        sshagent(credentials : ['${projectName}_${envName}']) {
            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - ${projectName} ${envName}"}' 'https://hooks.slack.com/services/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'"""
        }
    }
}
`;

const blocks = Object.values(projects)
  .map(project =>
    Object.entries(project.environments).map(
      ([envName, env]) =>
        generateBlock({ projectName: project.name, envName, ...env })
          .split('\n')
          .join('\n\t\t\t\t\t\t\t\t') // lol
    )
  )
  .flat()
  .join('\n');

const content = `#!/usr/bin/env groovy
pipeline {
    agent {
        label 'master'
    }

    stages {
        stage('build parallel') {
            parallel {                                
              ${blocks}
            }
        }
    }
}
`;

fs.writeFileSync(jenkinsFilePath, content, 'utf-8');
