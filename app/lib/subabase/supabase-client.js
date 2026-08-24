import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xfalpclejrmlbicoogdb.supabase.co";
const supabaseKey = "sb_publishable_auUpo0RSjMUv4lbcL0-y-A_pa2R2Caf";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
