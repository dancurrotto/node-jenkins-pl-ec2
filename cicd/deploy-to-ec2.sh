

echo 'Hello Dan'

echo "AWS_ACCESS_KEY_ID:$AWS_ACCESS_KEY_ID"
echo "AWS_SECRET_ACCESS_KEY:$AWS_SECRET_ACCESS_KEY"

aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set region us-east-2
aws configure set output json


aws deploy push --application-name node-jenkins-ec2 --description "This is a revision for the application" --s3-location s3://vs-code-deploy-dev/nje.zip --source /var/lib/jenkins/workspace/node-jenkins-ec2 --region us-east-2

e_tag=$(aws s3api head-object --bucket vs-code-deploy-dev --key nje.zip --query ETag)

#echo $(python getCleanedAws.py $e_tag )


returnValue=$(python getCleanedAws.py $e_tag )
echo $returnValue

aws deploy create-deployment --application-name node-jenkins-ec2 --s3-location bucket=vs-code-deploy-dev,key=nje.zip,bundleType=zip,eTag=$returnValue --deployment-group-name node-jenkins-ec2-dg --deployment-config-name CodeDeployDefault.OneAtATime --description test --region us-east-2

