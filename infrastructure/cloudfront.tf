# resource "aws_cloudfront_distribution" "cdn" {

#   origin {
#     domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
#     origin_id   = "frontend-origin"
#   }

#   enabled             = true
#   is_ipv6_enabled     = true
#   default_root_object = "index.html"

#   default_cache_behavior {
#     target_origin_id       = "frontend-origin"
#     viewer_protocol_policy = "redirect-to-https"

#     allowed_methods = ["GET", "HEAD"]
#     cached_methods  = ["GET", "HEAD"]

#     forwarded_values {
#       query_string = false

#       cookies {
#         forward = "none"
#       }
#     }
#   }

#   restrictions {
#     geo_restriction {
#       restriction_type = "none"
#     }
#   }

#   viewer_certificate {
#     cloudfront_default_certificate = true
#   }

#   tags = {
#     Name = "streamflix-cdn"
#   }
# }
