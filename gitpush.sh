#!/bin/bash

if [ -z "$1" ]; then
  echo "❌ Commit message required"
  echo "Usage: ./gitpush.sh \"your message\""
  exit 1
fi

git add .
git commit -m "$1"
git push origin main
