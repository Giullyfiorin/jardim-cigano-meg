import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ryxfxqvticvcathxehil.supabase.co'
const supabaseKey = 'sb_publishable_s6cD7GgWTSSBgvg8TVn3NQ_lEZmbZpw'

export const supabase = createClient(supabaseUrl, supabaseKey)