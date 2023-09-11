import { BrowserRouter } from 'react-router-dom'
import { NavigationMenu } from '@shopify/app-bridge-react'
import Routes from '@/Routes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  AppBridgeProvider,
  GraphQLProvider,
  PolarisProvider,
} from './components/providers'

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager('./pages/**/!(*.test.[jt]sx)*.([jt]sx)')

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <GraphQLProvider>
            <NavigationMenu
              navigationLinks={
                [
                  // Add pages here
                  // {
                  //   label: "Page name",
                  //   destination: "/pagename",
                  // },
                ]
              }
            />
            <Routes pages={pages} />
            <ReactQueryDevtools />
          </GraphQLProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  )
}
