terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-2"  # 修改为你的目标区域
}

resource "aws_security_group" "app_sg" {
  name        = "app-instance-sg"
  description = "Security group for 3000 port application"

  # SSH访问
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # 应用3000端口访问
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # 出站全部允许
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_instance" {
  ami           = "ami-034488765f896f58f"  # Amazon Linux 2 AMI (us-east-1)
  instance_type = "t2.micro"
  key_name      = "devops"     # 替换为你的密钥对名称

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              # 更新系统
              sudo yum update -y
              
              # 安装 Git
              sudo yum install -y git
              
              # 安装 Node.js 20.x（最新LTS版本）
              curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
              sudo yum install -y nodejs
              
              # 克隆代码仓库（替换为你的实际仓库地址）
              git clone https://github.com/Innovate-Future-Association-Translation/translator-app.git /home/ec2-user/app
              cd /home/ec2-user/app
              
              # 安装依赖并构建
              npm install
              npm run build
              

              
              # 使用PM2持久化运行
              sudo npm install -g pm2
              pm2 startup
              pm2 start npm --name "app" -- run start
              pm2 save
              EOF

  tags = {
    Name = "NodeJS-3000-Port-App"
  }
}

output "application_url" {
  value = "http://${aws_instance.app_instance.public_ip}:3000"
}
