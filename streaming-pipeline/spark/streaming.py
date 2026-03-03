# streaming.py

from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("KafkaStreaming") \
    .getOrCreate()

df = spark \
    .readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "kafka:9092") \
    .option("subscribe", "watch.completed") \
    .load()

data = df.selectExpr("CAST(value AS STRING)")

query = data.writeStream \
    .outputMode("append") \
    .format("console") \
    .start()

query.awaitTermination()