import { createParamDecorator, ExecutionContext } from '@nestjs/common'

/**
 * This decorator is used to inject the shopify session into a controller method.
 * There is no arguments required. Simply use `@ShopSession() session` in your controller method.
 */

export const ShopSession = createParamDecorator(
  async (_: unknown, ctx: ExecutionContext) => {
    const http = ctx.switchToHttp()
    const response = http.getResponse()

    const session = response.locals.shopify.session

    return session
  },
)
