/*
  # Add status column to leads table

  ## Changes
  - Adds `status` column to `leads` table (text, default 'Nuevo')
  - Adds `jarvis_draft` column to store AI-generated email drafts
  - Updates RLS to allow service role reads for dashboard usage

  ## New Columns
  - `status`: Lead processing state — 'Nuevo' | 'Procesado por J.A.R.V.I.S.' | 'Contacto Pendiente'
  - `jarvis_draft`: Stores the AI-generated response draft (text, nullable)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'status'
  ) THEN
    ALTER TABLE leads ADD COLUMN status text NOT NULL DEFAULT 'Nuevo';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'jarvis_draft'
  ) THEN
    ALTER TABLE leads ADD COLUMN jarvis_draft text;
  END IF;
END $$;
