#!/usr/bin/env bash
docker buildx build \
-f packages/server/Dockerfile \
--platform linux/arm64/v8,linux/amd64 \
-t lesterfernandez/whatsapp-clone:latest \
--push \
.