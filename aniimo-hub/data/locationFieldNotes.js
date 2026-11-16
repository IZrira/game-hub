const notes = {
  '청석 대지': {
    reviewedAt: '2026-11-16',
    intro: '이 지역에서 확인되는 기본 형태와 같은 진화 계보의 애니모를 함께 살펴보세요.',
    entries: [
      {
        title: '풀크랩 기본 형태',
        description: '풀크랩의 기본 형태는 청석 대지에 출현합니다. 진화 계보에는 유년기 싹크랩과 성숙기 풀크랩·스탈크랩이 표시됩니다.',
        links: [
          { name: '싹크랩', formKey: 'basic-form', label: '싹크랩 기본 형태' },
          { name: '풀크랩', formKey: 'basic-form', label: '풀크랩 기본 형태' },
          { name: '스탈크랩', formKey: 'basic-form', label: '스탈크랩 기본 형태' },
        ],
      },
      {
        title: '서걱리퍼 기본 형태',
        description: '서걱리퍼의 기본 형태가 출현하는 지역입니다. 같은 계보에 표시된 싹뚜기의 기본 형태도 함께 확인할 수 있습니다.',
        links: [
          { name: '싹뚜기', formKey: 'basic-form', label: '싹뚜기 기본 형태' },
          { name: '서걱리퍼', formKey: 'basic-form', label: '서걱리퍼 기본 형태' },
        ],
      },
      {
        title: '록볼볼 기본 형태',
        description: '록볼볼의 기본 형태는 청석 대지에 출현합니다. 같은 계보의 데굴굴은 유년기이며, 모터터와 록볼볼은 모두 성숙기로 표시됩니다.',
        links: [
          { name: '데굴굴', formKey: 'basic-form', label: '데굴굴 기본 형태' },
          { name: '모터터', formKey: 'basic-form', label: '모터터 기본 형태' },
          { name: '록볼볼', formKey: 'basic-form', label: '록볼볼 기본 형태' },
        ],
      },
    ],
  },
  '늑대이빨 능선': {
    reviewedAt: '2026-11-16',
    intro: '이글랑의 기본·뇌우·천휘 형태가 확인되는 지역입니다. 형태별 도감과 기본 형태의 진화 계보를 나누어 확인하세요.',
    entries: [
      {
        title: '이글랑 기본 형태의 진화 계보',
        description: '계보에는 탄멍멍이 유년기, 화르랑이 성장기, 이글랑과 헬울프가 성숙기로 표시됩니다.',
        links: [
          { name: '탄멍멍', formKey: 'basic-form', label: '탄멍멍 기본 형태' },
          { name: '화르랑', formKey: 'basic-form', label: '화르랑 기본 형태' },
          { name: '이글랑', formKey: 'basic-form', label: '이글랑 기본 형태' },
          { name: '헬울프', formKey: 'basic-form', label: '헬울프 기본 형태' },
        ],
      },
      {
        title: '이글랑 뇌우·천휘 형태',
        description: '뇌우 형태와 천휘 형태의 출현 지역에도 늑대이빨 능선이 표시됩니다. 뇌우 형태는 불·전기 원소를 함께 가집니다.',
        links: [
          { name: '이글랑', formKey: 'thunderstorm-form', label: '이글랑 뇌우 형태' },
          { name: '이글랑', formKey: 'prismana-form', label: '이글랑 천휘 형태' },
        ],
      },
    ],
  },
};

export const getLocationFieldNotes = (habitat, regionId) => regionId || !Object.hasOwn(notes, habitat) ? undefined : notes[habitat];

export const getLocationNotePath = link => `/gallery/aniimo/character/${encodeURIComponent(link.name)}${link.formKey === 'basic-form' ? '' : `?form=${encodeURIComponent(link.formKey)}`}`;

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

export function renderLocationFieldNotes(habitat, regionId) {
  const fieldNotes = getLocationFieldNotes(habitat, regionId);
  if (!fieldNotes) return '';
  return `<section aria-labelledby="location-field-notes-title"><h2 id="location-field-notes-title">형태별 출현과 진화 계보</h2><p>${escape(fieldNotes.intro)}</p>${fieldNotes.entries.map(entry => `<section><h3>${escape(entry.title)}</h3><p>${escape(entry.description)}</p><ul>${entry.links.map(link => `<li><a href="${escape(getLocationNotePath(link))}">${escape(link.label)}</a></li>`).join('')}</ul></section>`).join('')}</section>`;
}
