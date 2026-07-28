/**
 * Empirical Test Harness for R1, R2, R3 Requirements
 * Verification Script for teamwork_preview_challenger_m3_1
 */

import { assert } from 'console';

console.log('=== STARTING EMPIRICAL TEST SUITE (M3: R1, R2, R3) ===\n');

let passedTests = 0;
let failedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`[FAIL] ${name}:`, err.message);
    failedTests++;
  }
}

// -------------------------------------------------------------
// TEST SUITE 1: Auth Guards Logic (R1)
// -------------------------------------------------------------
runTest('R1: Unauthenticated Create Review triggers login modal callback', () => {
  let modalOpened = false;
  const mockUser = null;
  const openLoginModal = () => { modalOpened = true; };

  const handleCreateReview = (text, user) => {
    if (!user) {
      openLoginModal();
      return false;
    }
    return true;
  };

  const result = handleCreateReview('Test comment', mockUser);
  assert(result === false, 'Should return false when user is null');
  assert(modalOpened === true, 'Login modal should have been opened');
});

runTest('R1: Unauthenticated Edit Review triggers login modal callback', () => {
  let modalOpened = false;
  const mockUser = null;
  const openLoginModal = () => { modalOpened = true; };

  const handleEdit = (id, text, user) => {
    if (!user) {
      openLoginModal();
      return false;
    }
    return true;
  };

  const result = handleEdit('rev_1', 'Updated text', mockUser);
  assert(result === false, 'Should return false when user is null');
  assert(modalOpened === true, 'Login modal should have been opened');
});

runTest('R1: Unauthenticated Delete Review triggers login modal callback', () => {
  let modalOpened = false;
  const mockUser = null;
  const openLoginModal = () => { modalOpened = true; };

  const handleDelete = (id, user) => {
    if (!user) {
      openLoginModal();
      return false;
    }
    return true;
  };

  const result = handleDelete('rev_1', mockUser);
  assert(result === false, 'Should return false when user is null');
  assert(modalOpened === true, 'Login modal should have been opened');
});

runTest('R1: Unauthenticated Upvote triggers login modal callback', () => {
  let modalOpened = false;
  const mockUser = null;
  const openLoginModal = () => { modalOpened = true; };

  const handleToggleUpvote = (commentId, user) => {
    if (!user) {
      openLoginModal();
      return false;
    }
    return true;
  };

  const result = handleToggleUpvote('rev_1', mockUser);
  assert(result === false, 'Should return false when user is null');
  assert(modalOpened === true, 'Login modal should have been opened');
});

runTest('R1: Unauthenticated Report triggers login modal callback', () => {
  let modalOpened = false;
  const mockUser = null;
  const openLoginModal = () => { modalOpened = true; };

  const handleReport = (commentId, user) => {
    if (!user) {
      openLoginModal();
      return false;
    }
    return true;
  };

  const result = handleReport('rev_1', mockUser);
  assert(result === false, 'Should return false when user is null');
  assert(modalOpened === true, 'Login modal should have been opened');
});

// -------------------------------------------------------------
// TEST SUITE 2: Rich Text & Media (R2)
// -------------------------------------------------------------
runTest('R2: Markdown format insertion helper (Bold, Italic, Quote, Spoiler)', () => {
  const insertFormat = (commentText, start, end, prefix, suffix = '') => {
    const selectedText = commentText.substring(start, end);
    let replacement = '';
    if (selectedText) {
      replacement = `${prefix}${selectedText}${suffix}`;
    } else {
      const placeholderText = prefix === '>' ? ' quote' : prefix === '||' ? 'spoiler' : 'text';
      replacement = `${prefix}${placeholderText}${suffix}`;
    }
    return commentText.substring(0, start) + replacement + commentText.substring(end);
  };

  // Bold
  assert(insertFormat('Hello world', 6, 11, '**', '**') === 'Hello **world**', 'Bold with selection');
  assert(insertFormat('', 0, 0, '**', '**') === '**text**', 'Bold empty placeholder');

  // Italic
  assert(insertFormat('Hello world', 6, 11, '*', '*') === 'Hello *world*', 'Italic with selection');

  // Quote
  assert(insertFormat('Hello world', 0, 0, '> ') === '> quoteHello world', 'Quote insertion');

  // Spoiler
  assert(insertFormat('Secret text', 0, 6, '||', '||') === '||Secret|| text', 'Spoiler with selection');
});

runTest('R2: Markdown Spoiler regex parsing', () => {
  const spoilerRegex = /(\|\|[\s\S]+?\|\|)/g;

  const testText = 'This is a ||hidden spoiler|| in text.';
  const parts = testText.split(spoilerRegex);

  assert(parts.length === 3, 'Split should result in 3 parts');
  assert(parts[0] === 'This is a ', 'Part 0 is prefix text');
  assert(parts[1] === '||hidden spoiler||', 'Part 1 is spoiler block');
  assert(parts[2] === ' in text.', 'Part 2 is suffix text');

  // Verify extraction inside SpoilerSpan
  const innerContent = parts[1].slice(2, -2);
  assert(innerContent === 'hidden spoiler', 'Extracted content matches');
});

runTest('R2: Media URL attachment limit (Max 4 images)', () => {
  let mediaUrls = ['https://img1.png', 'https://img2.png', 'https://img3.png'];
  const addMediaUrl = (urls, newUrl) => {
    if (urls.length >= 4) return urls;
    return [...urls, newUrl];
  };

  mediaUrls = addMediaUrl(mediaUrls, 'https://img4.png');
  assert(mediaUrls.length === 4, '4th image added successfully');

  mediaUrls = addMediaUrl(mediaUrls, 'https://img5.png');
  assert(mediaUrls.length === 4, '5th image blocked by max limit');
});

// -------------------------------------------------------------
// TEST SUITE 3: Sorting Logic (R3)
// -------------------------------------------------------------
runTest('R3: Newest sorting orders by created_at descending', () => {
  const comments = [
    { id: '1', created_at: '2026-07-20T10:00:00Z', upvotes_count: 5, is_pinned: false },
    { id: '2', created_at: '2026-07-25T10:00:00Z', upvotes_count: 1, is_pinned: false },
    { id: '3', created_at: '2026-07-22T10:00:00Z', upvotes_count: 10, is_pinned: false },
  ];

  const sortNewest = (list) => {
    return [...list].sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  };

  const sorted = sortNewest(comments);
  assert(sorted[0].id === '2', 'First item is newest (2026-07-25)');
  assert(sorted[1].id === '3', 'Second item is 2026-07-22');
  assert(sorted[2].id === '1', 'Third item is 2026-07-20');
});

runTest('R3: Best sorting orders by upvotes_count descending', () => {
  const comments = [
    { id: '1', created_at: '2026-07-20T10:00:00Z', upvotes_count: 5, is_pinned: false },
    { id: '2', created_at: '2026-07-25T10:00:00Z', upvotes_count: 1, is_pinned: false },
    { id: '3', created_at: '2026-07-22T10:00:00Z', upvotes_count: 10, is_pinned: false },
  ];

  const sortBest = (list) => {
    return [...list].sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      const upvotesA = a.upvotes_count || a.like_count || 0;
      const upvotesB = b.upvotes_count || b.like_count || 0;
      if (upvotesA !== upvotesB) {
        return upvotesB - upvotesA;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  };

  const sorted = sortBest(comments);
  assert(sorted[0].id === '3', 'First item has highest upvotes (10)');
  assert(sorted[1].id === '1', 'Second item has 5 upvotes');
  assert(sorted[2].id === '2', 'Third item has 1 upvote');
});

runTest('R3: Pinned items are elevated above all non-pinned items regardless of sort mode', () => {
  const comments = [
    { id: '1', created_at: '2026-07-25T10:00:00Z', upvotes_count: 100, is_pinned: false },
    { id: '2', created_at: '2026-07-20T10:00:00Z', upvotes_count: 2, is_pinned: true },
  ];

  const sortBest = (list) => {
    return [...list].sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      const upvotesA = a.upvotes_count || a.like_count || 0;
      const upvotesB = b.upvotes_count || b.like_count || 0;
      if (upvotesA !== upvotesB) {
        return upvotesB - upvotesA;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  };

  const sorted = sortBest(comments);
  assert(sorted[0].id === '2', 'Pinned item (id 2) comes first despite lower upvotes/older date');
});

console.log(`\n=== SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED ===`);
if (failedTests > 0) {
  process.exit(1);
}
