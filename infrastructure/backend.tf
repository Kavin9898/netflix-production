terraform {
  backend "s3" {
    bucket = "netflix-production-801195563235"
    key    = "project/terraform.tfstate"
    region = "ap-south-1"
  }
}
