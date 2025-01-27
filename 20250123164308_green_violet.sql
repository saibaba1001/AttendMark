-- Drop existing policies
DROP POLICY IF EXISTS "Allow all users to mark attendance" ON attendance;
DROP POLICY IF EXISTS "Allow all users to read attendance" ON attendance;

-- Create new policies
CREATE POLICY "Allow public to mark attendance"
  ON attendance
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public to read attendance"
  ON attendance
  FOR SELECT
  TO public
  USING (true);