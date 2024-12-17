import {UserIcon} from '@sanity/icons'
import {seoObject} from '../objects'

export default {
  title: 'Press Page',
  name: 'pressPage',
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
      title: 'Press Cards',
      name: 'pressCards',
      type: 'array',
      of: [
        {
          title: 'Press Card',
          name: 'pressCard',
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Colour',
              name: 'colour',
              type: 'color',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Image',
              name: 'image',
              type: 'image',
              description: 'Please use abstract images with low detail',
            },
          ],
        },
      ],
    },
  ],
}
