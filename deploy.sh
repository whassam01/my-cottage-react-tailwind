npm install

if [ $? -eq 0 ]
then
  echo 'Step 1: Completed npm install'
else
  exit $?
fi

REACT_APP_STAGE=$REACT_APP_STAGE NODE_OPTIONS=--max_old_space_size=4096 npm run build

if [ $? -eq 0 ]
then
  echo 'Step 2: Completed npm run build'
else
  exit $?
fi

aws s3 sync build/ s3://$WEBSITE_BUCKET_NAME --delete

if [ $? -eq 0 ]
then
  echo 'Step 3: Completed aws s3 sync'
else
  exit $?
fi

# if [ $REACT_APP_STAGE == 'prod' ]; then 
  # aws cloudfront create-invalidation --distribution-id EJJPFK40P21MA --paths '/*'
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DIST_ID --paths '/*'
if [ $? -eq 0 ]
then
  echo 'Step 4: Completed cloudfront invalidation'
else
  exit $?
fi
# fi