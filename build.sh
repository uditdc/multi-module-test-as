#!/bin/bash

# Get the current working directory
currentDir=$(pwd)

rm -rf build

# Run the asc command with the specified options
asc assembly/index.ts --target release -o build/index.wasm --optimize
asc assembly/modules/moda.ts --target release -o build/moda.wasm --exportStart _initialize --optimize

# Function to calculate MD5 hash
calculate_md5() {
  md5sum "$1" | awk '{print $1}'
}

# Build the manifest
# Dynamic module entries
modules=""
for wasm_file in build/*.wasm; do
  file_name=$(basename "$wasm_file")
  module_name="${file_name%.*}"
  md5_hash=$(calculate_md5 "$wasm_file")

  if [[ $file_name == index* ]]; then
    module_type="entry"
  else
    module_type="module"
  fi

  modules+=$(cat << EOF
  {
    "file": "$currentDir/$wasm_file",
    "name": "$module_name",
    "type": "$module_type",
    "md5": "$md5_hash"
  },
EOF
  )
done

# Trim leading whitespace and trailing comma from modules
modules=${modules#"${modules%%[![:space:]]*}"}
modules=${modules%,}

manifest_content=$(cat << EOF
{
  "version": 1,
  "name": "multi-module-test-as",
  "description": "",
  "fs_root_path": "./",
  "runtime_logger": "runtime.log",
  "entry": "_start",
  "contentType": "text",
  "modules": [
    $modules
  ],
  "permissions": []
}
EOF
)

# Create the build folder if it doesn't exist
mkdir -p build

# Save the manifest.json content to build/manifest.json
echo "$manifest_content" > build/manifest.json

echo "Manifest file created and stored in build/manifest.json"