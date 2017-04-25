echo "Waiting for API to be ready..."
until $(curl --output /dev/null --silent --head --fail http://grocery-api:8888/healthcheck); do
    printf '...'
    sleep 2
done
echo "API is READY!!!"
echo "Running Migrations"
git clone https://github.com/bobderrico80/grocery-api
cd grocery-api
npm run migrate
cd ..
rm -rf grocery-api
echo "Migrations complete"
echo "Running tests"
npm test