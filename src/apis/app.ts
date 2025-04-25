import { RequestUtil } from './request'

export const AppApi = {
  getAbout() {
    return RequestUtil.get<AppAbout>('/api/about')
  },

  getLogs() {
    return RequestUtil.get<AppLog[]>('/api/logs')
  },

  getConfigs() {
    return RequestUtil.get<AppConfigs>('/api/configs')
  },

  changeConfig(config: AppConfigs) {
    return RequestUtil.post('/api/configs', config)
  },

  getFileContent(path: string) {
    return RequestUtil.get<string>('/api/file/content', { path })
  },

  writeFileContent(path: string, content: string) {
    return RequestUtil.post('/api/file/content', { path, content })
  },

  writeFileContentWithDir(dir: string, filename: string, content: string) {
    return RequestUtil.post<string>('/api/file/content-with-dir', { dir, filename, content })
  },

  uploadApk(file: File) {
    const formData = new FormData()
    formData.append('filename', file)
    return RequestUtil.post('/api/upload/apk', formData, undefined, false)
  },

  getChannelAlias() {
    return RequestUtil.get<string>('/api/channel-alias')
  },
  changeChannelAlias(alias: string) {
    return RequestUtil.post('/api/channel-alias', alias, undefined, false)
  },

  getCloudSyncData() {
    return RequestUtil.get<CloudSyncData>('/api/cloud-sync/data')
  },

  pushCloudSyncData(data: CloudSyncData) {
    return RequestUtil.post('/api/cloud-sync/data', data)
  },
}

export interface AppAbout {
  applicationId: string
  flavor: string
  buildType: string
  versionCode: number
  versionName: string
  deviceName: string
  deviceId: string
}

export interface AppLog {
  level: string
  tag: string
  message: string
  cause?: string
  time: number
}

export interface AppConfigs {
  appBootLaunch?: boolean
  appPipEnable?: boolean
  appLastLatestVersion?: string
  appAgreementAgreed?: boolean
  appStartupScreen?: string
  debugDeveloperMode?: boolean
  debugShowFps?: boolean
  debugShowVideoPlayerMetadata?: boolean
  debugShowLayoutGrids?: boolean
  iptvSourceCacheTime?: number
  iptvSourceCurrent?: IptvSource
  iptvSourceList?: IptvSourceList
  iptvChannelGroupHiddenList?: Set<string>
  iptvHybridMode?: IptvHybridMode
  iptvSimilarChannelMerge?: boolean
  iptvChannelLogoProvider?: string
  iptvChannelLogoOverride?: boolean
  iptvChannelFavoriteEnable?: boolean
  iptvChannelFavoriteListVisible?: boolean
  iptvChannelFavoriteList?: ChannelFavoriteList
  iptvChannelLastPlay?: Channel
  iptvChannelLinePlayableHostList?: Set<string>
  iptvChannelLinePlayableUrlList?: Set<string>
  iptvChannelChangeFlip?: boolean
  iptvChannelNoSelectEnable?: boolean
  iptvChannelChangeListLoop?: boolean
  epgEnable?: boolean
  epgSourceCurrent?: EpgSource
  epgSourceList?: EpgSourceList
  epgRefreshTimeThreshold?: number
  epgSourceFollowIptv?: boolean
  epgChannelReserveList?: EpgProgrammeReserveList
  uiShowEpgProgrammeProgress?: boolean
  uiShowEpgProgrammePermanentProgress?: boolean
  uiShowChannelLogo?: boolean
  uiShowChannelPreview?: boolean
  uiUseClassicPanelScreen?: boolean
  uiDensityScaleRatio?: number
  uiFontScaleRatio?: number
  uiTimeShowMode?: UiTimeShowMode
  uiFocusOptimize?: boolean
  uiScreenAutoCloseDelay?: number
  updateForceRemind?: boolean
  updateChannel?: string
  videoPlayerCore?: VideoPlayerCore
  videoPlayerRenderMode?: VideoPlayerRenderMode
  videoPlayerUserAgent?: string
  videoPlayerHeaders?: string
  videoPlayerLoadTimeout?: number
  videoPlayerDisplayMode?: VideoPlayerDisplayMode
  themeAppCurrent?: AppThemeDef
  cloudSyncAutoPull?: boolean
  cloudSyncProvider?: CloudSyncProvider
  cloudSyncGithubGistId?: string
  cloudSyncGithubGistToken?: string
  cloudSyncGiteeGistId?: string
  cloudSyncGiteeGistToken?: string
  cloudSyncNetworkUrl?: string
  cloudSyncLocalFilePath?: string
  cloudSyncWebDavUrl?: string
  cloudSyncWebDavUsername?: string
  cloudSyncWebDavPassword?: string
}

export enum IptvHybridMode {
  DISABLE = 'DISABLE',
  IPTV_FIRST = 'IPTV_FIRST',
  HYBRID_FIRST = 'HYBRID_FIRST',
}

export const IptvHybridModeLabels: { [key in IptvHybridMode]: string } = {
  [IptvHybridMode.DISABLE]: '禁用',
  [IptvHybridMode.IPTV_FIRST]: 'IPTV优先',
  [IptvHybridMode.HYBRID_FIRST]: '混合优先',
}

export interface IptvSource {
  name: string
  url: string
  isLocal: boolean
  transformJs?: string
}

export interface IptvSourceList {
  value: IptvSource[]
}

export interface EpgSource {
  name: string
  url: string
}

export interface EpgSourceList {
  value: EpgSource[]
}

export enum UiTimeShowMode {
  HIDDEN = 'HIDDEN',
  ALWAYS = 'ALWAYS',
  EVERY_HOUR = 'EVERY_HOUR',
  HALF_HOUR = 'HALF_HOUR',
}

export const UiTimeShowModeLabels: { [key in UiTimeShowMode]: string } = {
  [UiTimeShowMode.HIDDEN]: '隐藏',
  [UiTimeShowMode.ALWAYS]: '常显',
  [UiTimeShowMode.EVERY_HOUR]: '整点',
  [UiTimeShowMode.HALF_HOUR]: '半点',
}

export enum VideoPlayerCore {
  MEDIA3 = 'MEDIA3',
  IJK = 'IJK',
}

export const VideoPlayerCoreLabels: { [key in VideoPlayerCore]: string } = {
  [VideoPlayerCore.MEDIA3]: 'Media3',
  [VideoPlayerCore.IJK]: 'IjkPlayer',
}

export enum VideoPlayerRenderMode {
  SURFACE_VIEW = 'SURFACE_VIEW',
  TEXTURE_VIEW = 'TEXTURE_VIEW',
}

export const VideoPlayerRenderModeLabels: { [key in VideoPlayerRenderMode]: string } = {
  [VideoPlayerRenderMode.SURFACE_VIEW]: 'SurfaceView',
  [VideoPlayerRenderMode.TEXTURE_VIEW]: 'TextureView',
}

export enum VideoPlayerDisplayMode {
  ORIGINAL = 'ORIGINAL',
  FILL = 'FILL',
  CROP = 'CROP',
  FOUR_THREE = 'FOUR_THREE',
  SIXTEEN_NINE = 'SIXTEEN_NINE',
  WIDE = 'WIDE',
}

export const VideoPlayerDisplayModeLabels: { [key in VideoPlayerDisplayMode]: string } = {
  [VideoPlayerDisplayMode.ORIGINAL]: '原始',
  [VideoPlayerDisplayMode.FILL]: '填充',
  [VideoPlayerDisplayMode.CROP]: '裁剪',
  [VideoPlayerDisplayMode.FOUR_THREE]: '4:3',
  [VideoPlayerDisplayMode.SIXTEEN_NINE]: '16:9',
  [VideoPlayerDisplayMode.WIDE]: '2.35:1',
}

export enum CloudSyncProvider {
  GITHUB_GIST = 'GITHUB_GIST',
  GITEE_GIST = 'GITEE_GIST',
  NETWORK_URL = 'NETWORK_URL',
  LOCAL_FILE = 'LOCAL_FILE',
  WEBDAV = 'WEBDAV',
}

export const CloudSyncProviderLabels: { [key in CloudSyncProvider]: string } = {
  [CloudSyncProvider.GITHUB_GIST]: 'GitHub Gist',
  [CloudSyncProvider.GITEE_GIST]: 'Gitee 代码片段',
  [CloudSyncProvider.NETWORK_URL]: '网络链接',
  [CloudSyncProvider.LOCAL_FILE]: '本地文件',
  [CloudSyncProvider.WEBDAV]: 'WebDAV',
}

export interface AppThemeDef {
  name: string
  background: string
  texture?: string
  textureAlpha?: string
}

export interface Channel {
  name: string
  standardName: string
  epgName: string
  lineList: any
  logo?: string
  index: number
}

export interface ChannelFavoriteList {
  value: { channel: Channel, iptvSourceName: string, groupName: string }[]
}

export interface CloudSyncData {
  version: string
  syncAt: number
  syncFrom: string
}
