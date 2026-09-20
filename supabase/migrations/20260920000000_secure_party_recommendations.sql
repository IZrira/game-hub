-- Public recommendations are readable by everyone, but only the two configured
-- RIRA administrator accounts may create or modify recommendation rows.

ALTER TABLE public.party_recommendations ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON TABLE public.party_recommendations TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.party_recommendations TO authenticated;

DROP POLICY IF EXISTS "Public read party recommendations" ON public.party_recommendations;
CREATE POLICY "Public read party recommendations"
  ON public.party_recommendations
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "RIRA admins insert party recommendations" ON public.party_recommendations;
CREATE POLICY "RIRA admins insert party recommendations"
  ON public.party_recommendations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT auth.uid()) IN (
      '9ba8bfc5-f680-444d-8720-192f471610d3'::uuid,
      '48cfe362-20d7-4d13-b4bf-4400f6a2bba2'::uuid
    )
  );

DROP POLICY IF EXISTS "RIRA admins update party recommendations" ON public.party_recommendations;
CREATE POLICY "RIRA admins update party recommendations"
  ON public.party_recommendations
  FOR UPDATE
  TO authenticated
  USING (
    (SELECT auth.uid()) IN (
      '9ba8bfc5-f680-444d-8720-192f471610d3'::uuid,
      '48cfe362-20d7-4d13-b4bf-4400f6a2bba2'::uuid
    )
  )
  WITH CHECK (
    (SELECT auth.uid()) IN (
      '9ba8bfc5-f680-444d-8720-192f471610d3'::uuid,
      '48cfe362-20d7-4d13-b4bf-4400f6a2bba2'::uuid
    )
  );

DROP POLICY IF EXISTS "RIRA admins delete party recommendations" ON public.party_recommendations;
CREATE POLICY "RIRA admins delete party recommendations"
  ON public.party_recommendations
  FOR DELETE
  TO authenticated
  USING (
    (SELECT auth.uid()) IN (
      '9ba8bfc5-f680-444d-8720-192f471610d3'::uuid,
      '48cfe362-20d7-4d13-b4bf-4400f6a2bba2'::uuid
    )
  );

CREATE UNIQUE INDEX IF NOT EXISTS party_recommendations_game_party_uidx
  ON public.party_recommendations (game_id, party_id);
