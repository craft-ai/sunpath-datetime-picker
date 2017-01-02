#!/bin/bash
set -e # exit with nonzero exit code if anything fails

OUTPUT_DIR="./gh-pages"
PREP_DIR="./gh-pages-deploy"
TARGET_BRANCH="gh-pages"

# Save some useful information
USER=`git config user.name || echo "Stanley Kubick"`
EMAIL=`git config user.email || echo "contact@craft.ai"`
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

echo "Deploying '$OUTPUT_DIR' to '$SSH_REPO:$TARGET_BRANCH'..."

# Make sure we have a working ssh environment on Travis
if [[ -n "$TRAVIS" ]]; then
  echo "Setting up credentials ${ENCRYPTION_LABEL}..."
  USER="Travis CI"

  # Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
  ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
  ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
  ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
  ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
  openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d
  chmod 600 deploy_key
  eval `ssh-agent -s`
  ssh-add deploy_key
fi

# clear and re-create the preparation directory
echo "Preparing content in '$PREP_DIR' from '$OUTPUT_DIR'..."
rm -rf $PREP_DIR;
mkdir $PREP_DIR;
cp -r $OUTPUT_DIR/ $PREP_DIR/

# go to the out directory and create a *new* Git repo
echo "Initializing a git repository in '$PREP_DIR'..."
cd $PREP_DIR
git init > /dev/null

# The first and only commit to this new Git repo
git add . > /dev/null
git commit -m "Deploy to GitHub Pages: ${SHA}" > /dev/null

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.)
echo "Pushing to '$SSH_REPO:$TARGET_BRANCH'..."
git push --force --quiet $SSH_REPO master:$TARGET_BRANCH > /dev/null
