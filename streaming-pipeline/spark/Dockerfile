# Use official Spark image
FROM bitnami/spark:3.5

# Switch to root to install dependencies
USER root

# Install Python & pip
RUN install_packages python3 python3-pip

# Set working directory
WORKDIR /app

# Copy requirements file (if you have one)
COPY requirements.txt .

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy Spark streaming script
COPY streaming.py .

# Switch back to spark user
USER 1001

# Run Spark job
CMD ["spark-submit", "--master", "local[*]", "/app/streaming.py"]