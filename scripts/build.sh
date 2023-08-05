export DOCKER_BUILDKIT=1
docker build -t ministerio/tickets-admin:latest --shm-size 1G -f Dockerfile.dev .