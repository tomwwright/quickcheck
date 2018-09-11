#!/bin/bash

# aws dynamodb delete-table --table-name Checks --profile local --endpoint http://localhost:8000
aws dynamodb create-table --cli-input-json file://tables/checks.json --profile local --endpoint http://localhost:8000
aws dynamodb batch-write-item --cli-input-json file://tables/checks.items.json --profile local --endpoint http://localhost:8000

# aws dynamodb delete-table --table-name Results --profile local --endpoint http://localhost:8000
aws dynamodb create-table --cli-input-json file://tables/results.json --profile local --endpoint http://localhost:8000
aws dynamodb batch-write-item --cli-input-json file://tables/results.items.json --profile local --endpoint http://localhost:8000

aws sqs create-queue --queue-name quickcheck-emails-local --profile local --endpoint http://localhost:4576
aws sqs create-queue --queue-name quickcheck-checks-local --profile local --endpoint http://localhost:4576

