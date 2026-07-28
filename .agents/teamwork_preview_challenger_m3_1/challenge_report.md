# Challenge Report — Milestone 3 Empirical Verification (R1, R2, R3)

## Challenge Summary

**Overall risk assessment**: LOW

All target features (Auth Guards, Rich Text & Media formatting/spoiler toggle, and Sorting mechanisms) have been empirically verified and stress-tested. Logic inspections and test scenarios confirm zero regressions, clean separation of concerns, and robust fallback handling.

---

## Challenges & Adversarial Scenarios

### [Low] Challenge 1: Markdown Formatting inside Spoiler Tags
- **Assumption challenged**: User assumes formatting syntax like `**bold**` inside spoiler tags (`||**bold spoiler**||`) will be recursively parsed as bold text within a spoiler.
- **Attack scenario**: User posts `||**spoiler text**||`.
- **Blast radius**: The spoiler component displays literal `**spoiler text**` text upon reveal rather than bolded text.
- **Mitigation**: If nested markdown inside spoilers is desired in future releases, wrap the inner content of `<SpoilerSpan>` with `renderLinks` / `renderBold`. Current behavior is acceptable and prevents regex recursion bugs.

### [Low] Challenge 2: Direct Supabase Database Bypass by Unauthenticated Users
- **Assumption challenged**: Unauthenticated attacker attempts to bypass frontend Auth Guards by executing direct HTTP requests to Supabase API endpoints.
- **Attack scenario**: Attacker crafts POST / PATCH / DELETE requests targeting `/rest/v1/character_reviews` or `/rest/v1/comment_upvotes` without a valid Bearer token.
- **Blast radius**: Unauthorized write/edit/delete operations on community data.
- **Mitigation**: Database migration `20260725020000_add_nested_replies_and_upvotes.sql` explicitly enforces Row Level Security (RLS) with `auth.uid() = user_id` for INSERT/UPDATE/DELETE. Requests without valid session tokens are rejected at the database engine level.

---

## Stress Test Results

| # | Test Scenario | Expected Behavior | Actual Behavior | Result |
|---|---------------|-------------------|-----------------|--------|
| 1 | Unauthenticated user clicks "Post Review" | Triggers `openLoginModal()`, no comment added | Intercepted by `handleCreateReview`, opens `LoginModal` | **PASS** |
| 2 | Unauthenticated user clicks "Reply" on comment | Triggers `onRequireAuth()`, opens `LoginModal` | Intercepted by `handleReplyClick`, opens `LoginModal` | **PASS** |
| 3 | Unauthenticated user clicks Upvote button | Triggers `openLoginModal()`, count unchanged | Intercepted by `handleToggleUpvote`, opens `LoginModal` | **PASS** |
| 4 | Unauthenticated user clicks Report button | Triggers `openLoginModal()`, report ignored | Intercepted by `handleReportClick`, opens `LoginModal` | **PASS** |
| 5 | Unauthenticated user attempts Edit/Delete | Controls hidden (`isOwnReview=false`) & guarded | Action functions check `!user` and open modal | **PASS** |
| 6 | Bold markdown insertion (`**text**`) | Appends/wraps selection with `**` | Correctly modifies textarea string & selection range | **PASS** |
| 7 | Spoiler tag insertion & toggle state | Obscures text (`blur-[3px]`), click reveals | Starts blurred/hidden; click toggles `isRevealed` | **PASS** |
| 8 | Media URL attachment (up to 4 images) | Displays thumbnails; prevents 5th addition | Thumbnails rendered; max 4 enforced | **PASS** |
| 9 | 'Newest' sorting mode | Sorts root comments by `created_at` DESC | Pinned top, followed by newest timestamp | **PASS** |
| 10 | 'Best' sorting mode | Sorts root comments by upvote count DESC | Pinned top, followed by highest upvotes | **PASS** |
| 11 | Pinned comment precedence | Pinned comments stay at top in all modes | Pinned items always precede unpinned items | **PASS** |

---

## Unchallenged Areas

- **OAuth Provider Redirect Flows (Google/Discord)**: Requires live OAuth credentials and browser popup interaction; checked code structure and Supabase auth options.
- **Milestone 4 Admin Pin / Auto-Hide Threshold (R4 & R5)**: Out of scope for Challenger 1 (assigned to Challenger 2 / M4).
