-- party_recommendations was created without the usual service_role grant, so the server-side
-- secret key could read tier_lists and notices but got "permission denied" here.
-- Give service_role the same table access it has on the other content tables.
-- Row Level Security and the anon/authenticated grants are unchanged.
grant select, insert, update, delete on table public.party_recommendations to service_role;
