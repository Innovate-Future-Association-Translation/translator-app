#!/usr/bin/env bash
set -euo pipefail

# verify and pass imageTag
if [ $# -ne 1 ]; then
  echo "❌ Usage: $0 <imageTag>"
  exit 1
fi

# environment variables
ENV="uat"
CHART_DIR="./charts/dispatchai-frontend"
NAMESPACE="dispatchai-frontend-$ENV"
RELEASE_NAME="dispatchai-frontend-$ENV"
VALUES_FILE="values-${ENV^^}-frontend.yaml"

IMAGE_TAG=$1

echo "=================================================="
echo "🚀 Deploying $RELEASE_NAME:$IMAGE_TAG 🚀"
echo "=================================================="
helm upgrade --install $RELEASE_NAME $CHART_DIR \
  --namespace $NAMESPACE \
  --create-namespace \
  --set image.tag=$IMAGE_TAG \
  -f "$VALUES_FILE"

echo
echo "-----------------------------------------------------------------------"
echo "✅ $RELEASE_NAME deployed successfully! ✅ Resources created:"
echo "-----------------------------------------------------------------------"
kubectl get all -n $NAMESPACE
kubectl get ing -n $NAMESPACE
echo "-------------------------------------------------"
