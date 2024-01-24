import { type PagesFunction } from '@cloudflare/workers-types'
import { Env } from './lib/env'

const LINKEDIN_AUTH_URL =
 'https://www.linkedin.com/oauth/v2/authorization'

const TAGMEIN_LINKEDIN_REDIRECT_URI =
 'https://tagme.in/auth-linkedin'

const LINKEDIN_SCOPES: string[] = ['email']

export const onRequestGet: PagesFunction<
 Env
> = async ({ env }) => {
 const params: Record<string, string> = {
  response_type: 'code',
  client_id:
   env.TAGMEIN_AUTH_LINKEDIN_CLIENT_ID,
  redirect_uri: TAGMEIN_LINKEDIN_REDIRECT_URI,
  state: '',
  scope: encodeURIComponent(
   LINKEDIN_SCOPES.join(' ')
  ),
 }
 const Location = new URL(
  `${LINKEDIN_AUTH_URL}?${new URLSearchParams(
   params
  ).toString()}`
 ).toString()
 return new Response('', {
  headers: {
   Location,
  },
  status: 302,
 })
}
