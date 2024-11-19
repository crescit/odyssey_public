CREATE TABLE "order" (
    "order_id" BIGSERIAL PRIMARY KEY,
    "customer_id" TEXT NOT NULL,
    "company_id" BIGSERIAL NOT NULL,
    "items" JSONB, 
    "total" NUMERIC NOT NULL,
    "status" TEXT,
    "created" DATE,
    "updated" DATE,
    "intent_id" TEXT
);

ALTER TABLE "order" ADD FOREIGN KEY ("customer_id") REFERENCES "user" ("auth_id"); 

ALTER TABLE "order" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id"); 

CREATE INDEX ON "order" ("customer_id");
CREATE INDEX ON "order" ("company_id");