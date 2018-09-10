#!/bin/bash

# aws --profile local dynamodb delete-table --endpoint http://localhost:8000 --table-name Checks
aws --profile local dynamodb create-table --endpoint http://localhost:8000 --cli-input-json file://tables/checks.json
aws --profile local dynamodb batch-write-item --endpoint http://localhost:8000 --cli-input-json file://tables/checks.items.json

# aws --profile local dynamodb delete-table --endpoint http://localhost:8000 --table-name Results
aws --profile local dynamodb create-table --endpoint http://localhost:8000 --cli-input-json file://tables/results.json
aws --profile local dynamodb batch-write-item --endpoint http://localhost:8000 --cli-input-json file://tables/results.items.json

aws --profile local sqs create-queue --queue-name quickcheck-emails-local --endpoint http://localhost:4576
aws --profile local sqs create-queue --queue-name quickcheck-checks-local --endpoint http://localhost:4576

