resource "aws_db_subnet_group" "db_subnet" {
  name = "db-subnet-group"

  subnet_ids = [
    aws_subnet.private_subnet_1.id,
    aws_subnet.private_subnet_2.id
  ]

  tags = {
    Name = "db-subnet-group"
  }
}

resource "aws_db_instance" "mysql" {
  allocated_storage    = 20
  engine               = "mysql"
  instance_class       = "db.t3.medium"
  username             = var.db_username
  password             = var.db_password
  skip_final_snapshot  = true

  db_subnet_group_name = aws_db_subnet_group.db_subnet.name
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  publicly_accessible = false
}
