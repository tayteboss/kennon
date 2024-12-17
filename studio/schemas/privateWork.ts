import {CaseIcon} from '@sanity/icons'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {fullMedia, isolatedMedia, multiColumnMedia} from '../objects'

export default {
  title: 'Private Work',
  name: 'privateWork',
  type: 'document',
  icon: CaseIcon,
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: any) {
      const {title} = selection
      return {
        title: `${title}`,
      }
    },
  },
  fields: [
    orderRankField({type: 'publicWork'}),
    {
      title: 'Coming Soon',
      name: 'comingSoon',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        maxLength: 200,
        source: 'title',
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Landscape Thumbnail Image',
      name: 'landscapeThumbnailImage',
      type: 'image',
    },
    {
      title: 'Portrait Thumbnail Image',
      name: 'portraitThumbnailImage',
      type: 'image',
    },
    {
      title: 'Location',
      name: 'location',
      type: 'string',
      description: 'e.g. Melbourne, Australia',
    },
    {
      title: 'Year Completed',
      name: 'yearCompleted',
      type: 'number',
      validation: (Rule: any) => Rule.integer().positive(),
      description: 'Leave blank if coming soon',
    },
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'text',
      description: 'A brief summary or introduction of the work',
      rows: 3,
    },
    {
      title: 'Long description',
      name: 'description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [],
          },
        },
      ],
    },
    {
      title: 'Sketches',
      name: 'sketches',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      title: 'Credits',
      name: 'credits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {title: 'Title', name: 'title', type: 'string'},
            {title: 'Name', name: 'name', type: 'string'},
            {title: 'Link', name: 'link', type: 'url'},
          ],
        },
      ],
    },
    {
      title: 'Page Builder',
      name: 'pageBuilder',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              component: 'component',
            },
            prepare: ({component}: any) => {
              let componentName = ''

              if (component === 'fullMedia') {
                componentName = 'Full Media'
              } else if (component === 'multiColumnMedia') {
                componentName = 'Multi Column Media'
              } else if (component === 'isolatedMedia') {
                componentName = 'Isolated Media'
              } else {
                componentName = 'Unknown'
              }

              return {
                title: componentName,
              }
            },
          },
          fields: [
            {
              title: 'Select Media Component',
              name: 'component',
              type: 'string',
              options: {
                list: [
                  {title: 'Full Media', value: 'fullMedia'},
                  {title: 'Multi Column Media', value: 'multiColumnMedia'},
                  {title: 'Isolated Media', value: 'isolatedMedia'},
                ],
                layout: 'dropdown',
              },
            },
            fullMedia,
            isolatedMedia,
            multiColumnMedia,
          ],
        },
      ],
    },
    {
      title: 'Sense Blocks',
      name: 'senseBlocks',
      type: 'array',
      of: [{type: 'workSense'}],
      validation: (Rule: any) => Rule.min(2).max(3),
    },
    {
      title: 'Related Work',
      name: 'relatedWork',
      type: 'array',
      of: [{type: 'reference', to: {type: 'publicWork'}}],
      validation: (Rule: any) => Rule.min(2).max(3),
    },
  ],
}
