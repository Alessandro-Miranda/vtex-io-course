import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
  method,
} from '@vtex/api'
import { Clients } from './clients'
import { updateLiveUsers } from './event/liveUsersUpdate'
import { analytics } from './handlers/analytics'

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
  }
}

const TREE_SECONDS_MS = 3 * 1000;
const CONCURRENCY = 10;

export default new Service<Clients, State, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000,
      },
      events: {
        exponentialTimeoutCoefficient: 2, //fator exponencial em que timeout é incrementado a cada tentativa
        exponentialBackoffCoefficient: 2, //fator exponencial em que o backoff delay será incrementado a cada tentativa
        initialBackoffDelay: 50, // tempo que a app irá esperar até a próxima tentativa
        retries: 1, // quantidade máxima de tentativas da app
        timeout: TREE_SECONDS_MS, // timeout até ser considerado como uma tentativa mal sucedida
        concurrency: CONCURRENCY // quantidade de processos simultâneos que o evento é capaz de ter
      }
    },
  },
  routes: {
    analytics: method({
      GET: [analytics],
    }),
  },
  events: {
    liveUsersUpdate: updateLiveUsers
  }
})
