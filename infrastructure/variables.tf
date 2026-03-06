variable "aws_region" {
  default = "ap-south-1"
}

variable "vpc_cidr" {
  default = "192.168.0.0/24"
}

variable "instance_type" {
  default = "t3.medium"
}

variable "db_username" {
  default = "admin"
}

variable "db_password" {
  default = "Admin12345"
}
