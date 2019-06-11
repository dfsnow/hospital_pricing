source config.sh

sudo -u postgres createdb "$db_name" -O snow
sudo -u postgres psql -d "$db_name" << EOD

    CREATE EXTENSION postgis;
    CREATE EXTENSION fuzzystrmatch;

    SET CLIENT_ENCODING TO UTF8;
    SET STANDARD_CONFORMING_STRINGS TO ON;
    BEGIN;
    DROP TABLE IF EXISTS "public"."prices";
    CREATE TABLE "public"."prices" (
        "id" serial PRIMARY KEY,
        "price" numeric,
        "description" varchar(5000),
        "hospital_id" varchar(200),
        "filename" varchar(300),
        "charge_type" varchar(20)
        );
    COMMIT;
    CREATE INDEX prices_hid_idx ON prices (hospital_id);

    BEGIN;
    DROP TABLE IF EXISTS "public"."hospitals";
    CREATE TABLE "public"."hospitals" (
        "id" serial PRIMARY KEY,
        "hospital_name" varchar(300),
        "hospital_id" varchar(300),
        "hospital_url" varchar(400),
        "lon" numeric,
        "lat" numeric
        );
    SELECT AddGeometryColumn ('hospitals','geom',4326,'POINT',2);
    COMMIT;

    CREATE INDEX hospitals_hid_idx ON hospitals (hospital_id);
    CREATE INDEX ON "public"."hospitals" USING GIST ("geom");

    BEGIN;
    CREATE ROLE readonly;
    GRANT CONNECT ON DATABASE hospitals TO readonly;
    GRANT USAGE ON SCHEMA public TO readonly;
    GRANT SELECT ON hospitals TO readonly;
    GRANT SELECT ON prices TO readonly;

    CREATE USER $db_user;
    GRANT readonly TO $db_user;

    ALTER TABLE prices OWNER TO snow;
    ALTER TABLE hospitals OWNER TO snow;
    ALTER TABLE spatial_ref_sys OWNER TO snow;

    COMMIT;

EOD




