export interface AnvilOptions {
  setCliFlag(flag: string, value: string): void;
  removeCliFlag(flag: string): void;
  setCliToggle(flag: string, enabled: boolean): void;
}
