#!/bin/bash

# Get the current working directory
currentDir=$(pwd)

# Define the variables
runtimePath="$HOME/.bls/runtime/bls-runtime"
manifestPath="$currentDir/build/manifest.json"

# Execute the command and capture the output
result=$(echo $runtimePath $manifestPath)

# Print the result
echo "Running: $result"

$runtimePath $manifestPath