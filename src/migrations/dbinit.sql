CREATE USER karlitis WITH PASSWORD 'karlitis';
CREATE DATABASE karlitisdb;
GRANT ALL PRIVILEGES ON DATABASE karlitisdb TO karlitis;

\connect karlitisdb karlitis;

CREATE SCHEMA myschema;

CREATE TABLE myschema.schools (
    reg_nr INT PRIMARY KEY,
    nosaukums TEXT,
    adrese TEXT,
    gps_lat NUMERIC,
    gps_lon NUMERIC,
    skolotaji INT,
    skolotaju_videja_alga NUMERIC,
    class_start_time INT,
    class_end_time INT,
    phone_number TEXT,
    email TEXT,
    website TEXT
);

CREATE TABLE myschema.student_count (
    date date,
    school INT REFERENCES myschema.schools,
    count_1_klase INT,
    count_2_klase INT,
    count_3_klase INT,
    count_4_klase INT,
    count_5_klase INT,
    count_6_klase INT,
    count_7_klase INT,
    count_8_klase INT,
    count_9_klase INT,
    count_10_klase INT,
    count_11_klase INT,
    count_12_klase INT
);