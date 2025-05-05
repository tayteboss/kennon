import {UserIcon} from '@sanity/icons'
import {seoObject} from '../objects'

export default {
  title: 'Work Page',
  name: 'workPage',
  type: 'document',
  icon: UserIcon,
  fields: [
    {
      title: 'Reference Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
    },
    seoObject,
    {
      title: 'Private Residences Title',
      name: 'privateResidencesTitle',
      type: 'string',
    },
    {
      title: 'Multi Residential Title',
      name: 'multiResidentialTitle',
      type: 'string',
    },
    {
      title: 'Public Works Title',
      name: 'publicWorksTitle',
      type: 'string',
    },
  ],
}
