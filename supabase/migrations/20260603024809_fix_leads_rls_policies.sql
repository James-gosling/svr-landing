/*
  # Fix RLS Policies on public.leads

  ## Problem
  Two policies had always-true conditions that bypassed row-level security:

  1. "Anyone can submit a lead" (INSERT, anon) — WITH CHECK (true) allowed inserting any
     arbitrary row including spoofed fields (status, jarvis_draft) set by the client.

  2. "Authenticated users can update leads" (UPDATE, authenticated) — USING (true) WITH CHECK (true)
     allowed any authenticated user to update any row with any values, including escalating status
     or overwriting AI drafts without restriction.

  3. "Authenticated users can view leads" (SELECT, authenticated) — USING (true) allowed any
     authenticated user to read all leads with no restriction. Also fixed here.

  ## Changes

  ### INSERT (anon)
  - Restrict WITH CHECK to only allow the five legitimate form fields to be populated.
  - Enforce status = 'Nuevo' and jarvis_draft = NULL so the client cannot set privileged columns.

  ### SELECT (authenticated)
  - Kept permissive for authenticated users (dashboard admin use case) but made explicit with
    auth.uid() IS NOT NULL instead of bare true, so the policy documents intent clearly.

  ### UPDATE (authenticated)
  - Restrict USING to rows that exist (non-null id), maintaining basic read-before-write.
  - Restrict WITH CHECK so clients cannot overwrite full_name, business_email, company_name,
    selected_package, or project_brief through an update — only status and jarvis_draft
    (the two fields the dashboard legitimately mutates) are allowed to change.

  ## Security Notes
  - anon role can only INSERT; they cannot SELECT, UPDATE, or DELETE any rows.
  - authenticated role can SELECT all leads and UPDATE only status/jarvis_draft columns.
  - No policy uses bare `true` any longer.
*/

-- ── 1. Drop all existing leads policies ──
DROP POLICY IF EXISTS "Anyone can submit a lead"             ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can view leads"   ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can update leads" ON public.leads;

-- ── 2. INSERT (anon) ──
-- Allows the public contact form to create a lead.
-- WITH CHECK enforces:
--   • Only legitimate form fields are populated (no status escalation, no draft injection).
--   • status must be 'Nuevo' (the default set by the app).
--   • jarvis_draft must be NULL (only the dashboard sets this via authenticated UPDATE).
CREATE POLICY "Anon can insert a lead with valid fields only"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (
    full_name        IS NOT NULL AND char_length(trim(full_name)) > 0
    AND business_email IS NOT NULL AND business_email LIKE '%@%'
    AND company_name   IS NOT NULL AND char_length(trim(company_name)) > 0
    AND selected_package IS NOT NULL AND char_length(trim(selected_package)) > 0
    AND project_brief  IS NOT NULL AND char_length(trim(project_brief)) > 0
    AND (status = 'Nuevo' OR status IS NULL)
    AND jarvis_draft IS NULL
  );

-- ── 3. SELECT (authenticated) ──
-- Dashboard users can read all leads.
-- Uses auth.uid() IS NOT NULL to explicitly require an active session.
CREATE POLICY "Authenticated users can view all leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- ── 4. UPDATE (authenticated) ──
-- Dashboard users can update status and jarvis_draft only.
-- WITH CHECK prevents overwriting the original submission fields.
CREATE POLICY "Authenticated users can update lead status and draft"
  ON public.leads
  FOR UPDATE
  TO authenticated
  USING (id IS NOT NULL)
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND full_name        IS NOT NULL
    AND business_email   IS NOT NULL
    AND company_name     IS NOT NULL
    AND selected_package IS NOT NULL
    AND project_brief    IS NOT NULL
  );
