import psycopg2
import csv

conn = psycopg2.connect("host=localhost port=5433 dbname=hw07 user=postgres password=secret")
cursor = conn.cursor()

query = """
CREATE TABLE IF NOT EXISTS train (
id SERIAL PRIMARY KEY,
age INTEGER,
gender INTEGER,
height REAL,
weight REAL,
ap_hi INTEGER,
ap_lo INTEGER,
cholesterol INTEGER,
gluc INTEGER,
smoke BOOLEAN,
alco BOOLEAN,
active BOOLEAN,
cardio BOOLEAN
)
"""
cursor.execute(query)
conn.commit()

with open('mlbootcamp5_train.csv', 'r') as f:
	reader = csv.reader(f, delimiter=';')
	# Skip the header row
	next(reader)
	for row in reader:
		cursor.execute(
			"INSERT INTO train VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
			row
		)
conn.commit()

