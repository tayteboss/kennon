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
      title: 'Phrases',
      name: 'phrases',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      title: 'Base loop',
      name: 'baseLoop',
      type: 'file',
    },
    {
      title: 'Melody Sounds',
      name: 'melodySounds',
      type: 'array',
      of: [
        {
          title: 'Sound',
          name: 'sound',
          type: 'object',
          fields: [
            {
              title: 'File',
              name: 'file',
              type: 'file',
            },
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      title: 'Environmental Sounds',
      name: 'environmentalSounds',
      type: 'array',
      of: [
        {
          title: 'Sound',
          name: 'sound',
          type: 'object',
          fields: [
            {
              title: 'File',
              name: 'file',
              type: 'file',
            },
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}
