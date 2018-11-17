pipeline {
    agent any 
    
     environment {
                WORKSPACE=pwd()
                ETAG=''
    }
    stages {
        stage('Build'){
            steps{
                sh 'echo building...'
                git url: 'https://github.com/dcurrotto/node-jenkins-pl-ec2.git'
            }
        }
        stage('Deploy') {
            steps {
                
                sh 'echo $WORKSPACE'
                sh 'echo $AWS_ACCESS_KEY_ID'
                sh 'echo $PATH'
                sh '~/.local/bin/aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID'
                sh '~/.local/bin/aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY'
                sh '~/.local/bin/aws configure set region us-east-2'
                sh '~/.local/bin/aws configure set output json'                
                
                sh '~/.local/bin/aws deploy delete-deployment-group --application-name node-jenkins-pl-ec2 --deployment-group-name node-jenkins-pl-ec2-dg'
                sh '~/.local/bin/aws deploy delete-application --application-name node-jenkins-pl-ec2'
                sh '~/.local/bin/aws deploy create-application --application-name node-jenkins-pl-ec2'
                sh '~/.local/bin/aws deploy create-deployment-group --application-name node-jenkins-pl-ec2 --deployment-group-name node-jenkins-pl-ec2-dg --service-role-arn arn:aws:iam::921228410555:role/vs-code-deploy-role  --ec2-tag-filters Key=Environment,Value=code-deploy-dev,Type=KEY_AND_VALUE'                     
                
                //Push the archived code to S3.
                sh '~/.local/bin/aws deploy push --application-name node-jenkins-pl-ec2 --description "This is a revision for the application." --s3-location s3://vs-code-deploy-dev/njpe.zip --source /var/jenkins_home/workspace/node-jenkins-pl-ec2 --region us-east-2'
               
                //Get the e_tag from S3 and put it in the eTagResult file.
                sh '~/.local/bin/aws s3api head-object --bucket vs-code-deploy-dev --key njpe.zip --query ETag > eTagResult'
                
                //Set permissions on eTagResult file.
                sh 'chmod 777 "$WORKSPACE/eTagResult"'
                
                //Grab the value from eTagResult and pass it to getCleanedAws.py
                sh 'e_tag=$(head -1 $WORKSPACE/eTagResult) && echo $(python getCleanedAws.py $e_tag)'                
                
                sh 'cleanedE_tag=$(head -1 $WORKSPACE/cleanedAwsValue) && echo $(~/.local/bin/aws deploy create-deployment --application-name node-jenkins-pl-ec2 --s3-location bucket=vs-code-deploy-dev,key=njpe.zip,bundleType=zip,eTag=$cleanedE_tag --deployment-group-name node-jenkins-pl-ec2-dg --deployment-config-name CodeDeployDefault.OneAtATime --description test --file-exists-behavior OVERWRITE --region us-east-2)'               
                
            }
            
        }
    }
}