/**
 * Empirical Test Suite for R4 (Admin Pin), R5 (Report & Auto-Hide), SQL Migration, and TS Types.
 * Executed by Challenger 2 (teamwork_preview_challenger_m3_2)
 */

const fs = require('fs');
const path = require('path');

// Test Results Collector
const results = {
  adminPin: { passed: 0, failed: 0, tests: [] },
  reportAutoHide: { passed: 0, failed: 0, tests: [] },
  sqlMigration: { passed: 0, failed: 0, tests: [] },
  tsIntegrity: { passed: 0, failed: 0, tests: [] },
};

function recordResult(category, name, pass, detail) {
  results[category].tests.push({ name, pass, detail });
  if (pass) results[category].passed++;
  else results[category].failed++;
}

// ----------------------------------------------------
// 1. ADMIN PIN TEST SUITE (R4)
// ----------------------------------------------------
console.log('--- 1. Testing Admin Pin Elevation (R4) ---');

// Replicate exact sorting logic from CharacterReviewBoard.tsx
function sortReviews(reviews, sortMode) {
  const reviewIds = new Set(reviews.map((r) => r.id));
  const roots = reviews.filter((r) => !r.parent_id || !reviewIds.has(r.parent_id));

  return roots.sort((a, b) => {
    // 1. Elevate pinned comments first!
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;

    // 2. Sort mode: 'best' vs 'newest'
    if (sortMode === 'best') {
      const upvotesA = a.upvotes_count || a.like_count || 0;
      const upvotesB = b.upvotes_count || b.like_count || 0;
      if (upvotesA !== upvotesB) {
        return upvotesB - upvotesA;
      }
    }

    // Default or fallback: newest created_at
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}

const mockReviews = [
  { id: '1', created_at: '2026-07-25T10:00:00Z', upvotes_count: 50, is_pinned: false, parent_id: null },
  { id: '2', created_at: '2026-07-25T12:00:00Z', upvotes_count: 5,  is_pinned: false, parent_id: null },
  { id: '3', created_at: '2026-07-20T10:00:00Z', upvotes_count: 1,  is_pinned: true,  parent_id: null }, // Oldest, lowest likes, BUT PINNED
  { id: '4', created_at: '2026-07-25T11:00:00Z', upvotes_count: 10, is_pinned: false, parent_id: null },
];

// Test 1.1: Admin Pin in 'newest' sort mode
const newestSorted = sortReviews([...mockReviews], 'newest');
const test1_1 = newestSorted[0].id === '3' && newestSorted[1].id === '2';
recordResult(
  'adminPin',
  'Pinned comment elevated to top in "newest" mode',
  test1_1,
  `Top item ID: ${newestSorted[0].id} (expected '3')`
);

// Test 1.2: Admin Pin in 'best' sort mode
const bestSorted = sortReviews([...mockReviews], 'best');
const test1_2 = bestSorted[0].id === '3' && bestSorted[1].id === '1'; // '3' is pinned, then '1' has 50 upvotes
recordResult(
  'adminPin',
  'Pinned comment elevated to top in "best" mode over high-upvote unpinned item',
  test1_2,
  `Top item ID: ${bestSorted[0].id} (expected '3'), 2nd item ID: ${bestSorted[1].id} (expected '1')`
);

// Test 1.3: Multiple pinned comments sorting among themselves
const mockMultiplePinned = [
  { id: 'p1', created_at: '2026-07-25T10:00:00Z', upvotes_count: 5,  is_pinned: true, parent_id: null },
  { id: 'p2', created_at: '2026-07-25T12:00:00Z', upvotes_count: 20, is_pinned: true, parent_id: null },
  { id: 'u1', created_at: '2026-07-25T15:00:00Z', upvotes_count: 100, is_pinned: false, parent_id: null },
];
const multiPinnedBest = sortReviews([...mockMultiplePinned], 'best');
const test1_3 = multiPinnedBest[0].id === 'p2' && multiPinnedBest[1].id === 'p1' && multiPinnedBest[2].id === 'u1';
recordResult(
  'adminPin',
  'Multiple pinned comments sorted among themselves by sort mode before unpinned items',
  test1_3,
  `Order: [${multiPinnedBest.map(r=>r.id).join(', ')}] (expected ['p2', 'p1', 'u1'])`
);

// ----------------------------------------------------
// 2. REPORT & AUTO-HIDE TEST SUITE (R5)
// ----------------------------------------------------
console.log('--- 2. Testing Report & Auto-Hide (R5) ---');

// Replicate duplicate report prevention logic
function handleReport(review, userId, reportsDatabase) {
  if (review.user_has_reported) {
    return { success: false, reason: 'Already reported by this user (client state check)' };
  }
  
  // Check mock database UNIQUE(comment_id, user_id)
  const existingReport = reportsDatabase.find(
    (r) => r.comment_id === review.id && r.user_id === userId
  );
  if (existingReport) {
    return { success: false, reason: 'Database UNIQUE constraint violation' };
  }

  const newReportCount = (review.report_count || 0) + 1;
  reportsDatabase.push({ comment_id: review.id, user_id: userId });

  return {
    success: true,
    updatedReview: {
      ...review,
      report_count: newReportCount,
      user_has_reported: true,
    },
  };
}

const mockReportsDb = [];
let testComment = {
  id: 'c1',
  comment_text: 'Secret content',
  report_count: 2,
  user_has_reported: false,
};

// Test 2.1: Duplicate Report Prevention
const userA = 'user-101';
const report1 = handleReport(testComment, userA, mockReportsDb);
recordResult(
  'reportAutoHide',
  'First report from user succeeds',
  report1.success && report1.updatedReview.report_count === 3,
  `Report count after 1st report: ${report1.updatedReview.report_count}`
);

// Try second report from SAME user
const report2 = handleReport(report1.updatedReview, userA, mockReportsDb);
recordResult(
  'reportAutoHide',
  'Duplicate report from same user is blocked',
  !report2.success && report2.reason.includes('Already reported'),
  `Result: ${report2.reason}`
);

// Test 2.2: Blinding text & condition
const EXACT_REQUIRED_STRING = '유저들의 신고로 숨김 처리된 댓글입니다';

function checkBlinded(reportCount) {
  const isBlinded = reportCount >= 3;
  const renderedText = isBlinded ? EXACT_REQUIRED_STRING : 'Normal Comment Text';
  return { isBlinded, renderedText };
}

const resCount0 = checkBlinded(0);
const resCount2 = checkBlinded(2);
const resCount3 = checkBlinded(3);
const resCount4 = checkBlinded(4);

const test2_2 = 
  !resCount0.isBlinded &&
  !resCount2.isBlinded &&
  resCount3.isBlinded && resCount3.renderedText === EXACT_REQUIRED_STRING &&
  resCount4.isBlinded && resCount4.renderedText === EXACT_REQUIRED_STRING;

recordResult(
  'reportAutoHide',
  'Content blinded when report_count >= 3 with exact Korean notice string',
  test2_2,
  `Count 2 blinded: ${resCount2.isBlinded}, Count 3 blinded: ${resCount3.isBlinded}, String match: ${resCount3.renderedText === EXACT_REQUIRED_STRING}`
);

// ----------------------------------------------------
// 3. SQL MIGRATION FILE VERIFICATION
// ----------------------------------------------------
console.log('--- 3. Testing SQL Migration File ---');

const sqlPath = path.join(__dirname, '../../supabase/migrations/20260725030000_full_schema_and_moderation.sql');
let sqlContent = '';
let sqlExists = false;

try {
  sqlContent = fs.readFileSync(sqlPath, 'utf8');
  sqlExists = true;
} catch (err) {
  sqlExists = false;
}

recordResult('sqlMigration', 'SQL Migration file exists at expected path', sqlExists, sqlPath);

if (sqlExists) {
  const hasMediaUrls = sqlContent.includes('media_urls text[]');
  const hasLikeCount = sqlContent.includes('like_count integer');
  const hasReportCount = sqlContent.includes('report_count integer');
  const hasIsPinned = sqlContent.includes('is_pinned boolean');
  
  recordResult(
    'sqlMigration',
    'character_reviews ALTER TABLE adds required columns (media_urls, like_count, report_count, is_pinned)',
    hasMediaUrls && hasLikeCount && hasReportCount && hasIsPinned,
    `media_urls: ${hasMediaUrls}, like_count: ${hasLikeCount}, report_count: ${hasReportCount}, is_pinned: ${hasIsPinned}`
  );

  const hasCommentReportsTable = sqlContent.includes('CREATE TABLE IF NOT EXISTS comment_reports');
  const hasUniqueConstraint = sqlContent.includes('UNIQUE(comment_id, user_id)');
  
  recordResult(
    'sqlMigration',
    'comment_reports table created with UNIQUE(comment_id, user_id) constraint',
    hasCommentReportsTable && hasUniqueConstraint,
    `comment_reports created: ${hasCommentReportsTable}, UNIQUE constraint: ${hasUniqueConstraint}`
  );

  const hasRLSEnabled = sqlContent.includes('ALTER TABLE comment_reports ENABLE ROW LEVEL SECURITY');
  const hasReadPolicy = sqlContent.includes('Allow public read access to comment_reports');
  const hasInsertPolicy = sqlContent.includes('Allow authenticated users to insert reports');
  const hasUpdatePolicy = sqlContent.includes('Allow users to update own reviews or admin pin');

  recordResult(
    'sqlMigration',
    'RLS enabled and security policies defined for comment_reports & character_reviews',
    hasRLSEnabled && hasReadPolicy && hasInsertPolicy && hasUpdatePolicy,
    `RLS: ${hasRLSEnabled}, Read Policy: ${hasReadPolicy}, Insert Policy: ${hasInsertPolicy}, Admin Pin Policy: ${hasUpdatePolicy}`
  );
}

// ----------------------------------------------------
// 4. TYPESCRIPT CODE INTEGRITY VERIFICATION
// ----------------------------------------------------
console.log('--- 4. Testing TypeScript Code Integrity ---');

const reviewBoardPath = path.join(__dirname, '../../common-hub/components/CharacterReviewBoard.tsx');
const commentCardPath = path.join(__dirname, '../../common-hub/components/CommentCard.tsx');

let boardCode = fs.readFileSync(reviewBoardPath, 'utf8');
let cardCode = fs.readFileSync(commentCardPath, 'utf8');

const boardHasSortLogic = boardCode.includes('a.is_pinned && !b.is_pinned') && boardCode.includes("sortMode === 'best'");
recordResult(
  'tsIntegrity',
  'CharacterReviewBoard.tsx contains correct admin pin elevation sorting logic',
  boardHasSortLogic,
  `Sort logic found: ${boardHasSortLogic}`
);

const cardHasBlindedNotice = cardCode.includes('유저들의 신고로 숨김 처리된 댓글입니다');
const cardHasBlindedCondition = cardCode.includes('(review.report_count || 0) >= 3');
recordResult(
  'tsIntegrity',
  'CommentCard.tsx contains report_count >= 3 check and exact Korean string notice',
  cardHasBlindedNotice && cardHasBlindedCondition,
  `Blinded condition: ${cardHasBlindedCondition}, Notice string: ${cardHasBlindedNotice}`
);

// Summary Output
console.log('\n================ TEST SUMMARY ================');
let totalPassed = 0;
let totalFailed = 0;

for (const cat in results) {
  console.log(`\n[${cat.toUpperCase()}]`);
  results[cat].tests.forEach((t) => {
    console.log(`  ${t.pass ? '✅ PASS' : '❌ FAIL'}: ${t.name}`);
    console.log(`     Detail: ${t.detail}`);
  });
  totalPassed += results[cat].passed;
  totalFailed += results[cat].failed;
}

console.log(`\nTOTAL: ${totalPassed} Passed, ${totalFailed} Failed.`);
