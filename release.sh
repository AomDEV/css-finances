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

# Function to check for pending commits in the workspace
check_pending_commits() {
    if [[ -n $(git status --porcelain) ]]; then
        echo "There are uncommitted changes in the workspace. Please commit or stash them before proceeding."
        exit 1
    fi
}

# Function to set the new version in package.json
set_new_version() {
    echo "Enter the new version:"
    read NEW_VERSION

    # Validate the version format (simple regex for semver)
    if [[ ! $NEW_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "Invalid version format. Please use semantic versioning (e.g., 1.2.3)."
        exit 1
    fi

    # Update the version in package.json
    jq --arg new_version "$NEW_VERSION" '.version = $new_version' package.json > temp.json && mv temp.json package.json
    echo "Updated version in package.json to $NEW_VERSION."
}

# Function to check if node_modules exists
check_node_modules() {
    echo "Installing dependencies..."
    if [ ! -d "node_modules" ]; then
        yarn
    else
        rm -rf node_modules/ dist/
    fi
}

# Run jq check
check_jq_installed

# Check for pending commits
check_pending_commits

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
  git checkout -b $RELEASE_BRANCH
  git push -u origin $RELEASE_BRANCH
fi

# Set new version in package.json
set_new_version

# Get the new version number from package.json
VERSION=$(jq -r '.version' package.json)

# Commit and push the version bump
git add package.json
git commit -m "release: v$VERSION"
git push origin $MAIN_BRANCH

# Merge the main branch into the release branch with the new version in the commit message
git checkout $RELEASE_BRANCH
git merge $MAIN_BRANCH --no-ff -m "Merge branch '$MAIN_BRANCH' into '$RELEASE_BRANCH' - v$VERSION"

# Check for node_modules and install if not found
check_node_modules

# Run the build process
yarn build

# Remove the 'src' folder
rm -rf src

# Move the 'dist' folder to 'release' directory
mv dist/* release/

# Commit all changes with the version in the commit message
git add .
git commit -m "Release v$VERSION"

# Push the changes to the remote repository
git push origin $RELEASE_BRANCH

# Switch back to the main branch
git checkout $MAIN_BRANCH

echo "Release process completed successfully."
