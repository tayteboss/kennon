import contactPage from './contactPage'
import fullMedia from './fullImage'
import homePage from './homePage'
import isolatedMedia from './isolatedImage'
import multiColumnMedia from './multiColumnMedia'
import pressPage from './pressPage'
import privateWork from './privateWork'
import publicWork from './publicWork'
import sensitivePage from './sensitivePage'
import siteSettings from './siteSettings'
import studioPage from './studioPage'
import workPage from './workPage'
import workSense from './workSense'

export const schemaTypes = [
  // Site Settings
  siteSettings,

  // Pages
  homePage,
  workPage,
  studioPage,
  sensitivePage,
  pressPage,
  contactPage,

  // Work
  privateWork,
  publicWork,

  // Documents
  workSense,
]
