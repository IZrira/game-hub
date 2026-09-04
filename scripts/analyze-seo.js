import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Load environment variables from .env and .env.local if not already loaded
const loadEnvFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [k, ...v] = trimmed.split('=');
        if (k && !process.env[k.trim()]) {
          process.env[k.trim()] = v.join('=').trim().replace(/^["']|["']$/g, '');
        }
      }
    });
  }
};

loadEnvFile(path.join(ROOT_DIR, '.env.local'));
loadEnvFile(path.join(ROOT_DIR, '.env'));

const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
  (fs.existsSync(path.join(ROOT_DIR, 'google-credentials.json')) ? path.join(ROOT_DIR, 'google-credentials.json') : null);

const SITE_URL = process.env.SEARCH_CONSOLE_SITE_URL || 'https://rira-game-hub.pages.dev/';

/**
 * 날짜 포맷 (YYYY-MM-DD)
 */
const formatDate = (d) => d.toISOString().split('T')[0];

async function runSeoAnalysis() {
  console.log('='.repeat(60));
  console.log('🔍 [RIRA SEO] Google Search Console API 분석기');
  console.log('='.repeat(60));

  if (!CREDENTIALS_PATH || !fs.existsSync(CREDENTIALS_PATH)) {
    console.error('\n❌ [인증 실패] Google 서비스 계정 키(credentials.json)를 찾을 수 없습니다.');
    console.log('\n📌 [설정 방법]:');
    console.log('1. Google Cloud Console에서 서비스 계정 키를 다운로드받아');
    console.log('   프로젝트 루트에 "google-credentials.json" 파일로 저장하거나,');
    console.log('2. .env.local에 GOOGLE_APPLICATION_CREDENTIALS=경로 를 추가해 주세요.\n');
    process.exit(1);
  }

  console.log(`🔑 인증 파일: ${CREDENTIALS_PATH}`);
  console.log(`🌐 대상 사이트: ${SITE_URL}`);

  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  // 분석 기간 계산 (기본 최근 28일, 서치 콘솔 데이터는 2~3일 지연 반영됨)
  const endDateObj = new Date();
  endDateObj.setDate(endDateObj.getDate() - 3); // 3일 전
  const startDateObj = new Date(endDateObj);
  startDateObj.setDate(startDateObj.getDate() - 28); // 28일 전

  const startDate = formatDate(startDateObj);
  const endDate = formatDate(endDateObj);

  console.log(`📅 분석 기간: ${startDate} ~ ${endDate} (최근 28일)\n`);

  const outputDir = path.join(ROOT_DIR, 'analytics');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // 1. 전체 트렌드 집계
    const overallRes = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['date']
      }
    });

    const dateRows = overallRes.data.rows || [];
    let totalClicks = 0;
    let totalImpressions = 0;
    dateRows.forEach(r => {
      totalClicks += r.clicks || 0;
      totalImpressions += r.impressions || 0;
    });
    const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const avgPosition = dateRows.length > 0 
      ? dateRows.reduce((acc, r) => acc + (r.position || 0), 0) / dateRows.length 
      : 0;

    // 2. 상위 검색어 (Queries) 쿼리
    const queryRes = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 50
      }
    });
    const queries = queryRes.data.rows || [];

    // 3. 상위 페이지 (Pages) 쿼리
    const pageRes = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 50
      }
    });
    const pages = pageRes.data.rows || [];

    // 4. 기회 키워드 발굴 (노출은 많으나 클릭률이 낮거나 4~20위권에 걸쳐있는 키워드)
    const opportunityKeywords = queries.filter(q => {
      return (q.impressions >= 30 && q.position >= 4 && q.position <= 20) || (q.impressions >= 100 && (q.ctr * 100) < 5);
    }).sort((a, b) => b.impressions - a.impressions);

    // 콘솔 요약 출력
    console.log('📊 [전체 검색 성과 요약]');
    console.log(`- 총 클릭수(Clicks): ${totalClicks.toLocaleString()}회`);
    console.log(`- 총 노출수(Impressions): ${totalImpressions.toLocaleString()}회`);
    console.log(`- 평균 클릭률(CTR): ${avgCtr.toFixed(2)}%`);
    console.log(`- 평균 검색 순위(Position): ${avgPosition.toFixed(1)}위\n`);

    console.log(`🔥 [인기 검색 키워드 TOP 10]`);
    queries.slice(0, 10).forEach((q, i) => {
      const keyword = q.keys[0];
      const ctr = ((q.ctr || 0) * 100).toFixed(1);
      const pos = (q.position || 0).toFixed(1);
      console.log(`  ${i + 1}. "${keyword}" | 클릭 ${q.clicks} | 노출 ${q.impressions} | CTR ${ctr}% | ${pos}위`);
    });

    console.log(`\n📄 [인기 유입 페이지 TOP 5]`);
    pages.slice(0, 5).forEach((p, i) => {
      const pageUrl = p.keys[0];
      const ctr = ((p.ctr || 0) * 100).toFixed(1);
      const pos = (p.position || 0).toFixed(1);
      console.log(`  ${i + 1}. ${pageUrl} | 클릭 ${p.clicks} | 노출 ${p.impressions} | CTR ${ctr}% | ${pos}위`);
    });

    if (opportunityKeywords.length > 0) {
      console.log(`\n💡 [SEO 성장 기회 키워드 TOP 5] (노출 대비 유입 잠재력이 높은 키워드)`);
      opportunityKeywords.slice(0, 5).forEach((q, i) => {
        const keyword = q.keys[0];
        const ctr = ((q.ctr || 0) * 100).toFixed(1);
        const pos = (q.position || 0).toFixed(1);
        console.log(`  ${i + 1}. "${keyword}" (노출 ${q.impressions}회 / 현재 ${pos}위 / 클릭률 ${ctr}%)`);
      });
    }

    // 마크다운 리포트 생성
    const reportMd = generateMarkdownReport({
      siteUrl: SITE_URL,
      startDate,
      endDate,
      totalClicks,
      totalImpressions,
      avgCtr,
      avgPosition,
      queries,
      pages,
      opportunityKeywords
    });

    const reportPath = path.join(outputDir, 'seo-report-latest.md');
    const jsonOutputPath = path.join(outputDir, 'seo-report-latest.json');

    fs.writeFileSync(reportPath, reportMd, 'utf8');
    fs.writeFileSync(jsonOutputPath, JSON.stringify({
      summary: { totalClicks, totalImpressions, avgCtr, avgPosition, startDate, endDate },
      queries,
      pages,
      opportunityKeywords
    }, null, 2), 'utf8');

    console.log('\n' + '='.repeat(60));
    console.log(`✅ [분석 완료] 리포트 파일이 저장되었습니다:`);
    console.log(`   - Markdown: ${reportPath}`);
    console.log(`   - JSON: ${jsonOutputPath}`);
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('\n❌ [Search Console API 호출 실패]:', error.message);
    if (error.code === 403) {
      console.error('💡 [원인]: 해당 서비스 계정이 Search Console 속성에 사용자로 등록되지 않았거나 권한이 없습니다.');
      console.error(`   Search Console (https://search.google.com/search-console) -> 설정 -> 사용자 및 권한 -> 서비스 계정 이메일을 추가해 주세요.`);
    }
    process.exit(1);
  }
}

function generateMarkdownReport(data) {
  return `# 📈 Google Search Console 종합 현황 리포트

- **사이트**: \`${data.siteUrl}\`
- **조사 기간**: ${data.startDate} ~ ${data.endDate} (최근 28일)
- **생성 시각**: ${new Date().toLocaleString('ko-KR')}

---

## 1. 핵심 지표 요약 (Executive Summary)

| 지표 | 수치 | 설명 |
| :--- | :--- | :--- |
| **총 클릭수 (Clicks)** | **${data.totalClicks.toLocaleString()}회** | 검색 결과에서 유저가 사이트로 유입된 횟수 |
| **총 노출수 (Impressions)** | **${data.totalImpressions.toLocaleString()}회** | 검색 결과 화면에 사이트 링크가 노출된 횟수 |
| **평균 클릭률 (CTR)** | **${data.avgCtr.toFixed(2)}%** | 노출 대비 실제 클릭 비율 |
| **평균 검색 순위** | **${data.avgPosition.toFixed(1)}위** | 구글 검색 결과 내 평균 순위 |

---

## 2. 유입 상위 검색어 (Top Queries)

| 순위 | 검색어 (Query) | 클릭수 | 노출수 | 클릭률(CTR) | 평균 순위 |
| :---: | :--- | :---: | :---: | :---: | :---: |
${data.queries.slice(0, 20).map((q, i) => `| ${i + 1} | **${q.keys[0]}** | ${q.clicks} | ${q.impressions} | ${((q.ctr || 0) * 100).toFixed(1)}% | ${(q.position || 0).toFixed(1)}위 |`).join('\n')}

---

## 3. 유입 상위 페이지 (Top Landing Pages)

| 순위 | 페이지 URL | 클릭수 | 노출수 | CTR | 평균 순위 |
| :---: | :--- | :---: | :---: | :---: | :---: |
${data.pages.slice(0, 15).map((p, i) => `| ${i + 1} | \`${p.keys[0].replace(data.siteUrl, '/')}\` | ${p.clicks} | ${p.impressions} | ${((p.ctr || 0) * 100).toFixed(1)}% | ${(p.position || 0).toFixed(1)}위 |`).join('\n')}

---

## 4. 🚀 SEO 성장 기회 키워드 (High Opportunity Keywords)
> 노출수는 높으나(30회 이상) 순위가 1페이지 중하위권(4~20위)에 위치해 타이틀/메타 태그 및 본문 최적화 시 트래픽 급증이 예상되는 키워드입니다.

| 검색어 | 현재 순위 | 노출수 | 현재 클릭수 | 클릭률 | 추천 개선 방향 |
| :--- | :---: | :---: | :---: | :---: | :--- |
${data.opportunityKeywords.slice(0, 10).map(q => `| **${q.keys[0]}** | ${(q.position || 0).toFixed(1)}위 | ${q.impressions}회 | ${q.clicks}회 | ${((q.ctr || 0) * 100).toFixed(1)}% | 해당 키워드를 공략 제목 및 메타 설명문에 전진 배치 |`).join('\n')}
`;
}

runSeoAnalysis();