
CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  student_id text UNIQUE NOT NULL,
  course text NOT NULL,
  face_descriptor float8[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create attendance table
CREATE TABLE attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) NOT NULL,
  date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all users to read students"
  ON students
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all users to insert students"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all users to read attendance"
  ON attendance
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all users to mark attendance"
  ON attendance
  FOR INSERT
  TO authenticated
  WITH CHECK (true);