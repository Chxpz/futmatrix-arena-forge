-- Create the set_config function for setting user context
CREATE OR REPLACE FUNCTION public.set_config(setting_name text, setting_value text, is_local boolean)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  PERFORM set_config(setting_name, setting_value, is_local);
  RETURN 'OK';
END;
$$;