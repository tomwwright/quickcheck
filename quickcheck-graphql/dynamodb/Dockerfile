# http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html 
# 
# for details on how to run DynamoDB locally. This Dockerfile essentially
# replicates those instructions.

FROM openjdk:7
LABEL author="Tom Wright <github.com/tomwwright>"

RUN mkdir -p opt/dynamodb
WORKDIR /opt/dynamodb

RUN wget https://s3-us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.tar.gz -q -O - | tar -xz

EXPOSE 8000
ENTRYPOINT ["java", "-jar", "DynamoDBLocal.jar"]