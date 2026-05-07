CREATE TABLE IF NOT EXISTS open_roles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  industry TEXT NOT NULL,
  region TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Open',
  posted_at TEXT NOT NULL DEFAULT (datetime('now')),
  active INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_open_roles_active_posted
  ON open_roles (active, posted_at DESC);

INSERT OR IGNORE INTO open_roles (id, title, industry, region, status, posted_at)
VALUES
  ('seed-001', 'Electrical Inspector',  'Substation',  'Tennessee', 'Urgent',  datetime('now', '-3 days')),
  ('seed-002', 'QA/QC Manager',         'Solar',       'Texas',     'Open',    datetime('now', '-7 days')),
  ('seed-003', 'Civil Superintendent',  'Wind',        'Midwest',   'Filling', datetime('now', '-12 days')),
  ('seed-004', 'High Voltage Inspector','BESS',        'Southeast', 'Open',    datetime('now', '-5 days'));
