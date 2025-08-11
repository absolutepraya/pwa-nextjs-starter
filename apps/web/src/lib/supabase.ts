import { createClient } from '@supabase/supabase-js';

function resolveEnv() {
  const env = (process.env.NEXT_PUBLIC_SUPABASE_ENV || '').toLowerCase();
  const isProd =
    env === 'prod' ||
    env === 'production' ||
    process.env.NODE_ENV === 'production';
  return isProd ? 'PROD' : 'DEV';
}

function getUrl() {
  const kind = resolveEnv();
  return kind === 'PROD'
    ? process.env.NEXT_PUBLIC_SUPABASE_URL_PROD
    : process.env.NEXT_PUBLIC_SUPABASE_URL_DEV;
}

function getAnonKey() {
  const kind = resolveEnv();
  return kind === 'PROD'
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV;
}

export const supabase = createClient(
  getUrl() as string,
  getAnonKey() as string
);
