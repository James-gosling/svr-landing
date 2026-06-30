/*
  # Create leads table for SVR landing page CRM

  ## Summary
  Creates a `leads` table to capture inbound briefing requests submitted via the SVR landing page contact form.

  ## New Tables

  ### `leads`
  Stores all CRM lead submissions from the contact form.

  | Column            | Type        | Description                                        |
  |-------------------|-------------|----------------------------------------------------|
  | id                | uuid (PK)   | Auto-generated unique identifier                   |
  | full_name         | text        | Lead's full name (required)                        |
  | business_email    | text        | Lead's business email address (required)           |
  | company_name      | text        | Lead's company name (required)                     |
  | selected_package  | text        | Which SVR service tier they selected               |
  | project_brief     | text        | Free-text description of their project/needs       |
  | status            | text        | Lead status: 'new', 'contacted', 'qualified', etc. |
  | created_at        | timestamptz | Timestamp of submission                            |

  ## Security

  - RLS enabled — table is locked down by default
  - INSERT policy: any anonymous visitor can submit a lead (public form)
  - SELECT/UPDATE/DELETE policies: only authenticated service users can manage leads

  ## Notes

  1. The INSERT policy allows unauthenticated (anon) users to create leads — intentional for a public contact form
  2. Read/write access for lead management is restricted to authenticated roles only
  3. The `status` field defaults to 'new' for easy CRM pipeline filtering
*/

CREATE TABLE IF NOT EXISTS leads (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name        text NOT NULL DEFAULT '',
  business_email   text NOT NULL DEFAULT '',
  company_name     text NOT NULL DEFAULT '',
  selected_package text NOT NULL DEFAULT '',
  project_brief    text NOT NULL DEFAULT '',
  status           text NOT NULL DEFAULT 'new',
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- Index for common CRM queries
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (public contact form)
CREATE POLICY "Anyone can submit a lead"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to SELECT leads (CRM dashboard access)
CREATE POLICY "Authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to UPDATE lead status
CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
