import { beforeMount } from '@playwright/experimental-ct-vue/hooks'
import router from '../src/router';

beforeMount(async ({ app }) => {
  app.use(router);
})