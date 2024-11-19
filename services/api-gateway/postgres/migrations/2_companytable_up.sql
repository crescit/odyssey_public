CREATE TABLE "company" (
    "id" BIGSERIAL PRIMARY KEY,
    "company_name" TEXT,
    "email" TEXT NOT NULL,
    "metadata" JSON,
    "company_name_tokens" TSVECTOR,
    Unique("email")
);

CREATE INDEX ts_idx_company_name ON "company" USING GIN (company_name_tokens);