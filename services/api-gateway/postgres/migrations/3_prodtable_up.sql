CREATE TABLE "products" (
    "company_id" BIGSERIAL NOT NULL,
    "pid" BIGSERIAL PRIMARY KEY,
    "description" TEXT,
    "shopify_id" TEXT,
    "images" TEXT[],
    "handle" TEXT,
    "html_body" TEXT,
    "created_at" DATE,
    "updated_at" DATE,
    "published_at" DATE,
    "vendor"    TEXT,
    "category" TEXT,
    "tags" TEXT[],
    "title" TEXT NOT NULL,
    "inventory_count" NUMERIC, 
    "price"  NUMERIC,
    "textsearchable_product" TSVECTOR,
    "textsearchable_category" TSVECTOR
);

ALTER TABLE "products" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id"); 

CREATE INDEX ON "products" ("company_id");
CREATE INDEX ts_idx_product ON "products" USING GIN (textsearchable_product);
CREATE INDEX ts_idx_category ON "products" USING GIN (textsearchable_category);
