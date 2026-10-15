export interface WwGuideRuntime {
  guide: any;
  analysis?: any;
  echoes: Array<{ name: string; folderName?: string; cost: number }>;
}
