#!/bin/bash

# Ensure the script stops on the first error
set -e

# Function to check if jq is installed
check_jq_installed() {
    if ! command -v jq &> /dev/null; then
        echo "jq is not installed. Installing jq..."
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            sudo apt-get update && sudo apt-get install -y jq
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            brew install jq
        else
            echo "Unsupported OS. Please install jq manually."
            exit 1
        fi
    else
        echo "jq is already installed."
    fi
}

# Run jq check
check_jq_installed

# Define branch names
RELEASE_BRANCH="release"
MAIN_BRANCH="main"

# Fetch all branches
git fetch

# Check if the release branch exists
if git show-ref --verify --quiet refs/heads/$RELEASE_BRANCH; then
  echo "Branch '$RELEASE_BRANCH' already exists."
else
  echo "Creating new branch '$RELEASE_BRANCH'."
  git branch $RELEASE_BRANCH
fi

# Increase the minor version in package.json
npm version minor

# Get the new version number from package.json
VERSION=$(jq -r '.version' package.json)

# Commit and push the version bump
git add package.json
git commit -m "release: v$VERSION"
git push origin $MAIN_BRANCH

# Merge the main branch into the release branch with the new version in the commit message
git checkout $RELEASE_BRANCH
git merge $MAIN_BRANCH --no-ff -m "Merge branch '$MAIN_BRANCH' into '$RELEASE_BRANCH' - v$VERSION"

# Run the build process
yarn build

# Remove the 'src' folder
rm -rf src

# Move the 'dist' folder to the root directory
mv dist/* .

# Commit all changes with the version in the commit message
git add .
git commit -m "Release v$VERSION"

# Push the changes to the remote repository
git push origin $RELEASE_BRANCH

# Switch back to the main branch
git checkout $MAIN_BRANCH

echo "Release process completed successfully."
