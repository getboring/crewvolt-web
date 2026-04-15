CREATE TABLE IF NOT EXISTS workers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  city TEXT,
  state TEXT,
  roles TEXT,
  project_types TEXT,
  years_experience INTEGER,
  regions TEXT,
  availability TEXT,
  resume_url TEXT,
  certifications TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  client_type TEXT,
  vendor_status TEXT DEFAULT 'prospect',
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  client_id TEXT REFERENCES clients(id),
  project_name TEXT NOT NULL,
  location TEXT,
  project_type TEXT,
  start_date TEXT,
  end_date TEXT,
  status TEXT DEFAULT 'planning',
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS project_roles (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES projects(id),
  role_title TEXT NOT NULL,
  bill_rate REAL,
  pay_rate REAL,
  status TEXT DEFAULT 'open',
  worker_id TEXT REFERENCES workers(id),
  start_date TEXT,
  end_date TEXT,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS placements (
  id TEXT PRIMARY KEY,
  worker_id TEXT REFERENCES workers(id),
  project_role_id TEXT REFERENCES project_roles(id),
  start_date TEXT,
  end_date TEXT,
  status TEXT DEFAULT 'active',
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS form_submissions (
  id TEXT PRIMARY KEY,
  form_type TEXT NOT NULL,
  data TEXT NOT NULL,
  email TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
