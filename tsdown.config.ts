import { externalClientBundle } from '../../tools/dshx/src/client-build.js'

// RC8's official clientBundle() preset only discovers packages/*/*, so an
// out-of-tree my-plugins package builds through the dshx compatibility
// adapter instead (lazy-CJS browser half + CSS module ownership included).
export default externalClientBundle('dsh-image-conatiner', [
  'lib/types/index.js',
  'lib/types/invariant.js',
])
