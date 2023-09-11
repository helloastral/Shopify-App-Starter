import { useAppBridge } from '@shopify/app-bridge-react'
import { Redirect } from '@shopify/app-bridge/actions'
import axios from 'axios'
import { useMemo } from 'react'
import { getSessionToken } from '@shopify/app-bridge/utilities'

export function useApi() {
  const app = useAppBridge()

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: '/api',
    })

    // To check if the token is set or wait the request until it's set
    instance.interceptors.request.use(async (config) => {
      const token = await getSessionToken(app)

      config.headers['Authorization'] = `Bearer ${token}`
      config.headers['X-Requested-With'] = 'XMLHttpRequest'

      return config
    })

    instance.interceptors.response.use(
      (response) => {
        checkHeadersForReauthorization(response.headers, app)
        return response
      },
      (error) => {
        if (error.response.headers) {
          checkHeadersForReauthorization(error.response.headers, app)
        }
        return Promise.reject(error)
      }
    )

    return instance
  }, [app])

  return api
}

function checkHeadersForReauthorization(headers: any, app: any) {
  if (headers.get('X-Shopify-API-Request-Failure-Reauthorize') === '1') {
    const authUrlHeader =
      headers.get('X-Shopify-API-Request-Failure-Reauthorize-Url') ||
      `/api/auth`

    const redirect = Redirect.create(app)
    redirect.dispatch(
      Redirect.Action.REMOTE,
      authUrlHeader.startsWith('/')
        ? `https://${window.location.host}${authUrlHeader}`
        : authUrlHeader
    )
  }
}
