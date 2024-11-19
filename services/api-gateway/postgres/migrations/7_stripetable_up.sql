CREATE TABLE "stripe" (
  "stripe_id" TEXT PRIMARY KEY,
  "auth_id" TEXT,
  "company_id" BIGSERIAL,
  UNIQUE(auth_id),
  UNIQUE(company_id)
);

ALTER TABLE "stripe" ADD FOREIGN KEY ("auth_id") REFERENCES "user" ("auth_id"); 
ALTER TABLE "stripe" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id"); 
