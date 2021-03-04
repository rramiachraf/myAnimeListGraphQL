import { app } from './app'
import { port } from './env'

app.listen(port, () => {
  console.log('Server is up and running on', port)
})
