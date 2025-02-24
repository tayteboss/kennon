import contactPage from './contactPage'
import homePage from './homePage'
import multiResWork from './multiResWork'
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
  multiResWork,

  // Documents
  workSense,
]
