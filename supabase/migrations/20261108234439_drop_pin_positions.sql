-- Removes the positions of the hand-written notes on the home page ("Turn off comments if
-- you want using the toolbar!" and an older one). The notes were taken off the site in
-- components/CommentPins.jsx, and nothing reads or writes this table any more.
--
-- The two rows, for the record (page 'home', type 'annotation'):
--   annotation   x_pct 121.119791666666   y_pct 22.4    updated 2026-09-06
--   annotation2  x_pct -32.0364583333333  y_pct 17.95   updated 2026-11-08
--
-- Dropping the table also drops its two policies ("anyone can read pin positions",
-- "owner can write pin positions") and takes it out of the supabase_realtime publication.
-- Nothing else depends on it (no foreign keys, views or triggers).

delete from public.pin_positions where id in ('annotation', 'annotation2');
drop table if exists public.pin_positions;
