provider "aws" {
  region = "ap-southeast-2"
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

variable "jwt_secret" {}
variable "db_username" {}
variable "db_password" {}
variable "mongodb_uri" {}
variable "openai_api_key" {}

# ===  upload Secrets to AWS Secrets Manager ===
resource "aws_secretsmanager_secret" "backend_env" {
  name = "prod/backend/env"
}

resource "aws_secretsmanager_secret_version" "backend_env_version" {
  secret_id     = aws_secretsmanager_secret.backend_env.id
  secret_string = jsonencode({
    JWT_SECRET      = var.jwt_secret
    JWT_ALGORITHM   = "HS256"
    JWT_EXPIRE_TIME = "3600"
    DB_USERNAME     = var.db_username
    DB_PASSWORD     = var.db_password
    MONGODB_URI     = var.mongodb_uri
    OPENAI_API_KEY  = var.openai_api_key
  })
}

