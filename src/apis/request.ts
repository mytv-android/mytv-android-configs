import { closeToast, showLoadingToast } from 'vant'

function mapToQueryParams(map: object): string {
  const queryParams: string[] = []

  Object.entries(map).forEach(([key, value], _) => {
    const encodedKey = encodeURIComponent(key)
    const encodedValue = encodeURIComponent(String(value))
    queryParams.push(`${encodedKey}=${encodedValue}`)
  })

  return queryParams.join('&')
}

export const RequestUtil = {
  async request<T>(method: string, path: string, params?: object, data?: any, jsonBody?: boolean, configs?: RequestInit): Promise<Awaited<T>> {
    showLoadingToast({ message: '加载中...', forbidClick: true, duration: 0 })

    try {
      const paramsStr = params ? `?${mapToQueryParams(params)}` : ''
      const response = await fetch(
        `${path}${paramsStr}`,
        {
          method,
          headers: jsonBody ? { 'Content-Type': 'application/json' } : {},
          body: jsonBody ? JSON.stringify(data) : data,
          ...configs,
        },
      )
      closeToast()

      const contentType = response.headers.get('Content-Type')

      if (contentType?.includes('text/html'))
        return response.text() as Awaited<T>
      if (contentType?.includes('application/json'))
        return response.json() as Awaited<T>

      return response.text() as Awaited<T>
    }
    catch (e) {
      showToast('请求失败')
      throw e
    }
  },

  get<T>(path: string, params?: object, configs?: RequestInit) {
    return this.request<T>('GET', path, params, configs)
  },

  post<T>(path: string, data: any, params?: object, jsonBody = true, configs?: RequestInit) {
    return this.request<T>('POST', path, params, data, jsonBody, configs)
  },
}
