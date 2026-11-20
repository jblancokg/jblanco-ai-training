#!/bin/bash

PR_TITLE="$1"
PR_BODY="$2"

if [ -z "$PR_TITLE" ]; then
  echo "Error: PR title is required."
  exit 1
fi

if [ -z "$PR_BODY" ]; then
  echo "Error: PR body is required."
  exit 1
fi

echo "Creating GitHub PR with title: $PR_TITLE"
echo "And body:"
echo "$PR_BODY"

gh pr create --title "$PR_TITLE" --body "$PR_BODY"

