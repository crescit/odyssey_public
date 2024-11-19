CREATE EXTENSION postgis;

CREATE TABLE "location" (
  "id" BIGSERIAL PRIMARY KEY, 
  "addresses" JSONB,
  "geom"  geometry(POINT,4326) NOT NULL,
  "auth_id" TEXT
);

ALTER TABLE "location" ADD FOREIGN KEY ("auth_id") REFERENCES "user" ("auth_id"); 
CREATE INDEX geog_indx ON "location" USING GIST (geom);