// Short-lived (5 min, server-enforced) handoff of the pending-MFA token
// between /admin/login and /admin/mfa — sessionStorage rather than a query
// param so it never lands in browser history/server logs, and rather than
// global state since it's only needed for this one two-step handoff.
export const ADMIN_MFA_TOKEN_KEY = "ilkal_admin_mfa_token";
