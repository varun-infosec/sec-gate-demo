provider "aws" {
  region = "ap-south-1"
}

resource "aws_security_group" "payments" {
  name        = "payments-lookup"
  description = "payments lookup service"

  ingress {
    description = "ssh"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "mysql"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_s3_bucket" "exports" {
  bucket = "payments-exports-demo"
  acl    = "public-read"
}
