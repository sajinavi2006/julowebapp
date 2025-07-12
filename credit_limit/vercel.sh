if [[ $VERCEL_GIT_COMMIT_REF =~ (master)  ]] ; then
  echo "Build $VERCEL_GIT_COMMIT_REF with UAT environment"
  npm run build:uat
else
  echo "Build $VERCEL_GIT_COMMIT_REF with staging environment"
  npm run build:staging
fi