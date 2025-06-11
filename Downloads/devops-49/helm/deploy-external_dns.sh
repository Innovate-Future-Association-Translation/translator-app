#!/usr/bin/env bash
set -euo pipefail

# envs for arguments
RELEASE_NAME="external-dns"
CHART_DIR="./charts/external-dns"
NAMESPACE="kube-system"
VALUES_FILE="values-UAT-external_dns.yaml"

helm upgrade --install "$RELEASE_NAME" "$CHART_DIR" \
  -n "$NAMESPACE" \
  -f "$VALUES_FILE" \
  --reset-values

echo "✅ $RELEASE_NAME deployed successfully! ✅"
