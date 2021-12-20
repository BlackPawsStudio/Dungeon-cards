import hero from './assets/images/hero.svg'
import hp0 from './assets/images/hp0.svg'
import hp1 from './assets/images/hp1.svg'
import foe1 from './assets/images/foe1.svg'
import foe2 from './assets/images/foe2.svg'
import foe3 from './assets/images/foe3.svg'
import { Images } from './types'

export const images:Images = {
  hero: {0: hero},
  heal: {5: hp0, 6: hp0, 7: hp1, 8: hp1},
  foe: {1: foe1, 2: foe2, 3: foe3},
}