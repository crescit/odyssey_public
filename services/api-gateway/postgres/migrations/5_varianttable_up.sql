CREATE TABLE "variant" (
    "pid" BIGSERIAL,
    "vid" BIGSERIAL PRIMARY KEY,
    "title" TEXT,
    "options" TEXT[],
    "requires_shipping" BOOLEAN,
    "taxable" BOOLEAN,
    "featured_image" TEXT,
    "available" BOOLEAN,
    "price" TEXT,
    "grams" NUMERIC,
    "compare_price" TEXT,
    "position" NUMERIC,
    "shopify_id" TEXT,
    "created_at" DATE,
    "updated_at" DATE,
    "inventory_quantity" NUMERIC,
    "sku" TEXT,
    "barcode" TEXT
);

ALTER TABLE "variant" ADD FOREIGN KEY ("pid") REFERENCES "products" ("pid"); 

CREATE INDEX ON "variant" ("pid");