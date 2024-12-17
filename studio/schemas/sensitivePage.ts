import {UserIcon} from '@sanity/icons'
import {selectMediaTypeObject, imageObject, videoObject, seoObject} from '../objects'

export default {
  title: 'Being Sensitive Page',
  name: 'sensitivePage',
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
      title: 'Hero title',
      name: 'heroTitle',
      type: 'string',
    },
    {
      title: 'Media',
      name: 'media',
      type: 'object',
      fields: [
        selectMediaTypeObject,
        {
          ...imageObject,
          hidden: ({parent}: any) => parent?.mediaType !== 'image',
        },
        {
          ...videoObject,
          hidden: ({parent}: any) => parent?.mediaType !== 'video',
        },
      ],
    },
  ],
}
