import {UserIcon} from '@sanity/icons'

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
    {
      title: 'Hero title',
      name: 'heroTitle',
      type: 'string',
    },
  ],
}
