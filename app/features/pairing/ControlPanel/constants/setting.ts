export enum Setting {
  SearchNear = 'searchNear',
  Sound = 'sound'
}

export const SETTING_OPTIONS = [
  {
    CATEGORY: Setting.SearchNear,
    LABEL: '搜尋附近'
  },
  {
    CATEGORY: Setting.Sound,
    LABEL: '互動音效'
  }
] as const;
