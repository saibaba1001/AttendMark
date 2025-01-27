
DROP POLICY IF EXISTS "Allow all users to insert students" ON students;
DROP POLICY IF EXISTS "Allow all users to read students" ON students;

CREATE POLICY "Allow public to insert students"
  ON students
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public to read students"
  ON students
  FOR SELECT
  TO public
  USING (true);