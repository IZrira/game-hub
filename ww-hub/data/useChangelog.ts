import { useState, useEffect } from 'react';

interface ChangelogItem {
  date: string;
  version: string;
  content: string;
}

export const useChangelog = () => {
  const [logs, setLogs] = useState<ChangelogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GitHub API를 통해 최신 커밋 기록을 가져옵니다.
    const fetchCommits = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/IZrira/riragameinfo/commits?per_page=5');
        const data = await response.json();
        
        const formattedLogs = data.map((commit: any) => ({
          date: new Date(commit.commit.author.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }),
          version: commit.sha.substring(0, 7), // 커밋 해시를 버전으로 활용
          content: commit.commit.message // 커밋 메시지를 내용으로 활용
        }));
        
        setLogs(formattedLogs);
      } catch (error) {
        console.error('Changelog fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  return { logs, loading };
};