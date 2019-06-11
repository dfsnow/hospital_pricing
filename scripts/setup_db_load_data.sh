source config.sh

docker pull dimitri/pgloader
docker run \
    -v $proj_dir/scripts:/tmp \
    -v $proj_dir/data:/data/ \
    --security-opt seccomp=unconfined \
    --rm \
    --name pgloader \
    dimitri/pgloader:latest \
    pgloader /tmp/hospitals.load

docker run \
    -v $proj_dir/scripts:/tmp \
    -v $proj_dir/data:/data/ \
    --security-opt seccomp=unconfined \
    --rm \
    --name pgloader \
    dimitri/pgloader:latest \
    pgloader /tmp/prices.load




