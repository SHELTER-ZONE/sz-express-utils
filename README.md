# sz-express-utils

## **middleware**

> **sendResponse**

```ts
import express from 'express'
import { sendResponse } from '@shelter-zone/sz-express-utils'

const app = express()
app.use(sendResponse)
```

## **middleware/validate**

> **useReqDataValidate**

```ts
import { useReqDataValidate } from '@shelter-zone/sz-express-utils'
import { CreateUserDataValidate } from './model'

const { joiValidate, superStructValidate } = useReqDataValidate()

router.post(
  '/user',
  joiValidate(CreateUserDataValidate, 'body'),
  async (req, res) => {...}
)
```

> **useApiAuthentication**

```ts
import { useApiAuthentication } from '@shelter-zone/sz-express-utils'
import { userDB } from './db'
import routes from './routes'

const PRIVATEKEY = process.env.PRIVATEKEY

const userAuthentication = useApiAuthentication(userDB, PRIVATEKEY)

export const router = express.Router()
router.use('/api', userAuthentication, routes)
```

## **logger**

```ts
import { log } from '@shelter-zone/sz-express-utils'
log({
  level: 'info',
  message: 'hello world',
})
```

## **Utils**

> **validateUserID**

```ts
import { validateUserID } from '@shelter-zone/sz-express-utils'

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
