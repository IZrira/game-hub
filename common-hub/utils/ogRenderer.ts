/**
 * @fileoverview Dynamic OpenGraph (OG) Image and Preview Card Canvas Generator
 * Renders standard 1200x630 OpenGraph cards in-browser or on edge environments for viral social sharing.
 */

export interface CharacterOGOptions {
  name: string;
  gameTitle: string;
  element?: string;
  path?: string;
  tagline?: string;
  avatarUrl?: string;
  themeColor?: string;
}

export interface PartyOGOptions {
  partyName: string;
  gameTitle: string;
  category?: string;
  description?: string;
  members: { name: string; avatarUrl?: string; role?: string }[];
  themeColor?: string;
}

export class OGRenderer {
  private static readonly WIDTH = 1200;
  private static readonly HEIGHT = 630;

  /**
   * Helper to load an image onto an HTMLImageElement
   */
  private static loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }

  /**
   * Generates a dynamic 1200x630 character guide OG image
   */
  public static async generateCharacterOG(options: CharacterOGOptions): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = this.WIDTH;
    canvas.height = this.HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas 2d context');

    const theme = options.themeColor || '#7E30E1';

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, this.WIDTH, this.HEIGHT);
    bgGrad.addColorStop(0, '#09090c');
    bgGrad.addColorStop(0.5, '#121218');
    bgGrad.addColorStop(1, '#08080a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    // 2. Ambient Neon Glow
    const glowGrad = ctx.createRadialGradient(900, 200, 50, 900, 200, 500);
    glowGrad.addColorStop(0, `${theme}40`);
    glowGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    // 3. Grid Pattern Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < this.WIDTH; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y < this.HEIGHT; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.WIDTH, y);
      ctx.stroke();
    }

    // 4. Header Badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.beginPath();
    ctx.roundRect(80, 70, 260, 44, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.stroke();

    ctx.font = '900 16px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('✦ RIRA ARCHIVE', 105, 98);

    // 5. Game Subtitle
    ctx.font = '700 20px Inter, sans-serif';
    ctx.fillStyle = theme;
    ctx.fillText(options.gameTitle.toUpperCase(), 80, 160);

    // 6. Character Title & Tagline
    ctx.font = '900 64px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(options.name, 80, 240);

    // Element & Path Pill Badges
    let badgeX = 80;
    if (options.element) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.roundRect(badgeX, 270, 120, 36, 18);
      ctx.fill();
      ctx.font = '700 16px Inter, sans-serif';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(options.element, badgeX + 24, 294);
      badgeX += 140;
    }
    if (options.path) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.roundRect(badgeX, 270, 120, 36, 18);
      ctx.fill();
      ctx.font = '700 16px Inter, sans-serif';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(options.path, badgeX + 24, 294);
    }

    // Guide Feature Bullets
    ctx.font = '500 22px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('• 최적 종결 광추 / 무기 세팅 & 대체 추천', 80, 360);
    ctx.fillText('• 유물 / 에코 추천 옵션 & 스탯 우선순위', 80, 405);
    ctx.fillText('• 추천 시너지 파티 조합 & 스킬 매커니즘', 80, 450);

    // 7. Watermark Footer
    ctx.font = '600 16px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillText('rira-game-hub.pages.dev | Integrated Game Intelligence', 80, 560);

    // 8. Draw Character Portrait on the right if provided
    if (options.avatarUrl) {
      try {
        const charImg = await this.loadImage(options.avatarUrl);
        ctx.save();
        // Circular / Rounded mask
        ctx.beginPath();
        ctx.roundRect(750, 80, 370, 470, 32);
        ctx.clip();
        ctx.drawImage(charImg, 750, 80, 370, 470);
        ctx.restore();

        // Border around portrait
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(750, 80, 370, 470, 32);
        ctx.stroke();
      } catch (e) {
        console.warn('Failed to load avatar for OG:', e);
      }
    }

    return canvas.toDataURL('image/png');
  }

  /**
   * Generates a dynamic 1200x630 party recommendation card OG image
   */
  public static async generatePartyOG(options: PartyOGOptions): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = this.WIDTH;
    canvas.height = this.HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas 2d context');

    const theme = options.themeColor || '#00D287';

    // 1. Background
    const bgGrad = ctx.createLinearGradient(0, 0, this.WIDTH, this.HEIGHT);
    bgGrad.addColorStop(0, '#0a0a0f');
    bgGrad.addColorStop(1, '#101018');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    // 2. Glow
    const glowGrad = ctx.createRadialGradient(600, 300, 50, 600, 300, 600);
    glowGrad.addColorStop(0, `${theme}30`);
    glowGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    // 3. Header
    ctx.font = '900 16px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('✦ RIRA ARCHIVE | RECOMMENDED SQUAD', 80, 80);

    ctx.font = '900 48px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(options.partyName, 80, 150);

    if (options.description) {
      ctx.font = '500 18px Inter, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(options.description.slice(0, 70) + '...', 80, 190);
    }

    // 4. Draw Member Cards (up to 4 members)
    const cardWidth = 230;
    const cardHeight = 280;
    const startX = 80;
    const startY = 230;
    const gap = 20;

    for (let i = 0; i < Math.min(options.members.length, 4); i++) {
      const m = options.members[i];
      const cx = startX + i * (cardWidth + gap);

      // Card Background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      ctx.roundRect(cx, startY, cardWidth, cardHeight, 20);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Member Avatar
      if (m.avatarUrl) {
        try {
          const mImg = await this.loadImage(m.avatarUrl);
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(cx + 25, startY + 25, 180, 170, 16);
          ctx.clip();
          ctx.drawImage(mImg, cx + 25, startY + 25, 180, 170);
          ctx.restore();
        } catch (e) {
          // ignore avatar load fail
        }
      }

      // Member Name
      ctx.font = '900 20px Inter, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(m.name, cx + cardWidth / 2, startY + 230);

      // Member Role
      if (m.role) {
        ctx.font = '600 13px Inter, sans-serif';
        ctx.fillStyle = theme;
        ctx.fillText(m.role, cx + cardWidth / 2, startY + 255);
      }
      ctx.textAlign = 'left';
    }

    // 5. Watermark Footer
    ctx.font = '600 15px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillText('rira-game-hub.pages.dev | Community Squad Build', 80, 580);

    return canvas.toDataURL('image/png');
  }
}
