resource "aws_launch_template" "app_lt" {
  name_prefix   = "app-template"
  image_id      = "ami-0f5ee92e2d63afc18"
  instance_type = var.instance_type

  network_interfaces {
    security_groups = [aws_security_group.web_sg.id]
  }
}