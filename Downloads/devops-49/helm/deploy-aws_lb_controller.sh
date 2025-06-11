#!/usr/bin/env bash
set -euo pipefail

# envs for arguments
RELEASE_NAME="aws-load-balancer-controller"
CHART_DIR="./charts/aws-load-balancer-controller"
NAMESPACE="kube-system"
VALUES_FILE="values-UAT-aws_lb_controller.yaml"

helm upgrade --install "$RELEASE_NAME" "$CHART_DIR" \
  -n "$NAMESPACE" \
  -f "$VALUES_FILE" \
  --reset-values

echo "✅ Script executed successfully. ✅"
