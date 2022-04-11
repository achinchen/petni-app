export enum Setting {
  SearchNear = 'searchNear',
  Sounds = 'sounds'
}

export const SETTING_OPTIONS = [
  {
    CATEGORY: Setting.SearchNear,
    LABEL: '搜尋附近'
  },
  {
    CATEGORY: Setting.Sounds,
    LABEL: '互動音效'
  }
] as const;
