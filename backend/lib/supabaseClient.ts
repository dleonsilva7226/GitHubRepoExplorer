// supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// async function testConnection() {
//   const { data, error } = await supabase.from("User").select('*').limit(1)

//   if (error) {
//     console.error('❌ Supabase client test failed:', error.message)
//     process.exit(1)
//   }

//   console.log('✅ Supabase client is working! Sample row:', data)
// }


// testConnection()