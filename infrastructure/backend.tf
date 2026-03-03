terraform {
  backend "s3" {
    bucket = "netflix-production"
    key    = "project/terraform.tfstate"
    region = "ap-south-1"
  }
}