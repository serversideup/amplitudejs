#!/usr/bin/env bash
# Smoke test for a running AJN Radio instance.
# Usage: scripts/smoke.sh <base-url>        e.g. scripts/smoke.sh http://localhost:8080
# Env:   SMOKE_PASSWORD  preview password when PREVIEW_ACCESS=authenticated (sent as HTTP Basic)
# Exit code is non-zero if any check fails. Needs: bash, curl, node.
set -u
BASE="${1:?usage: smoke.sh <base-url>}"
BASE="${BASE%/}"
AUTH=()
if [ -n "${SMOKE_PASSWORD:-}" ]; then AUTH=(-u ":${SMOKE_PASSWORD}"); fi
fail=0
pass() { echo "PASS  $1"; }
bad()  { echo "FAIL  $1"; fail=1; }

# 1. health
body=$(curl -fsS --max-time 10 "$BASE/api/health") && echo "$body" | grep -q '"status":"ok"' && pass "health: $body" || bad "health: ${body:-no response}"

# 2. catalog
catalog=$(curl -fsS --max-time 15 "${AUTH[@]}" "$BASE/api/channels?limit=50") || catalog=""
count=$(printf '%s' "$catalog" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{console.log(JSON.parse(s).channels.length)}catch{console.log(0)}})')
slug=$(printf '%s' "$catalog" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const c=JSON.parse(s).channels.find(x=>x.type!=="on_demand");console.log(c?c.slug:"")}catch{console.log("")}})')
if [ "${count:-0}" -ge 1 ]; then pass "catalog: $count channels"; else bad "catalog: no channels"; fi

# 3. one SSE frame within 5s
if [ -n "$slug" ]; then
  frame=$(curl -sN --max-time 5 "${AUTH[@]}" "$BASE/api/channels/$slug/events" 2>/dev/null | head -n 5)
  if printf '%s' "$frame" | grep -q '^event: now-playing'; then pass "sse: initial now-playing frame for '$slug'"; else bad "sse: no now-playing frame for '$slug' (got: ${frame:-nothing})"; fi
else
  bad "sse: no non-podcast channel to test"
fi

# 4. unauthenticated ingest must be rejected (401 when a token is configured, 503 if ingest is disabled)
code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 -X POST -H 'content-type: application/json' -d '{"title":"x"}' "$BASE/api/ingest/channels/${slug:-none}/now-playing")
if [ "$code" = "401" ]; then pass "ingest without token -> 401"; else bad "ingest without token -> $code (expected 401)"; fi

# 5. noindex
robots=$(curl -fsS --max-time 10 "${AUTH[@]}" "$BASE/robots.txt") || robots=""
xrobots=$(curl -sI --max-time 10 "${AUTH[@]}" "$BASE/" | tr -d '\r' | grep -i '^x-robots-tag:' || true)
if printf '%s' "$robots" | grep -q 'Disallow: /' && printf '%s' "$xrobots" | grep -qi noindex; then pass "noindex: robots.txt + X-Robots-Tag"; else bad "noindex missing (robots='${robots}', header='${xrobots}')"; fi

[ "$fail" = 0 ] && echo "ALL CHECKS PASSED" || echo "SMOKE TEST FAILED"
exit "$fail"
