#!/bin/bash

file_path="./data.tsv"
lines_to_keep=5000

head -n $lines_to_keep "$file_path" > temp_file.tsv
mv temp_file.tsv "$file_path"
echo "File updated successfully."