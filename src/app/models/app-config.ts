export interface AppConfigData {
  extraPrice: number,
  acc: Array<{ name: string, icon: string }>
}
export interface AppConfig {
  id: number
  data: AppConfigData
}
