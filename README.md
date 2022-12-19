# sz-express-utils

## **middleware**

> **sendResponse**

```ts
import express from 'express'
import { sendResponse } from '@shelter-zone/sz-express-utils/middleware/base'

const app = express()
app.use(sendResponse)
```

## **middleware/validate**

> **requestDataValidate**

```ts
import { requestDataValidate } from '@shelter-zone/sz-express-utils/middleware/validate'
import {CreateUserDataValidate} from './model'

router.post(
  '/user',
  requestDataValidate(CreateUserDataValidate, 'body'),
  async (req, res) => {...}
)
```

> **useApiAuthentication**

```ts
import { useApiAuthentication } from '@shelter-zone/sz-express-utils/middleware/validate'
import { userDB } from './db'
import routes from './routes'

const PRIVATEKEY = process.env.PRIVATEKEY

const userAuthentication = useApiAuthentication(userDB, PRIVATEKEY)

export const router = express.Router()
router.use('/api', userAuthentication, routes)
```

## **logger**

```ts
import { log } from '@shelter-zone/sz-express-utils/utils/logger'
log({
  level: 'info',
  message: 'hello world',
})
```

## **Utils**

> **validateUserID**

```ts
import { validateUserID } from '@shelter-zone/sz-express-utils/utils/discord'

router.post(
  '/user',
  async (req, res) => {
    try {
      await validateUserID(req.headers.authorization, req.body.id)
      ...
    }
    catch (err) {
      ...
    }
  }
)
```
