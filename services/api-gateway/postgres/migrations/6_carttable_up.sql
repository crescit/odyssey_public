CREATE TABLE "cart" (
    "cart_id" BIGSERIAL PRIMARY KEY,
    "customer_id" TEXT NOT NULL,
    "vid" BIGSERIAL NOT NULL,
    "quantity" NUMERIC NOT NULL,
    "added_at" DATE
);

ALTER TABLE "cart" ADD FOREIGN KEY ("customer_id") REFERENCES "user" ("auth_id"); 

ALTER TABLE "cart" ADD FOREIGN KEY ("vid") REFERENCES "variant" ("vid"); 

CREATE INDEX ON "cart" ("customer_id");
CREATE INDEX ON "cart" ("vid");