<template>
  <Suspense>
    <router-view />
  </Suspense>
</template>

<script>
import { geoFenceService } from 'example/src/services';

export default {
  provide: {
    geoFenceService,
  },
};
</script>
