import {UserIcon} from '@sanity/icons'
import {selectMediaTypeObject, imageObject, videoObject, seoObject} from '../objects'

export default {
  title: 'Studio Page',
  name: 'studioPage',
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
      title: 'Hero images',
      name: 'heroImages',
      type: 'array',
      of: [{type: 'image'}],
      description: 'Please upload png sketches/drawings per the design',
    },
    {
      title: 'Studio Section',
      name: 'studioSection',
      type: 'object',
      fields: [
        {
          title: 'Subheading',
          name: 'subheading',
          type: 'string',
        },
        {
          title: 'Heading',
          name: 'heading',
          type: 'text',
          rows: 3,
        },
        {
          title: 'Sector Experience',
          name: 'sectorExperience',
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
          title: 'Associations',
          name: 'associations',
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
          title: 'Awards',
          name: 'awards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {title: 'Year', name: 'year', type: 'number'},
                {
                  title: 'Award Title',
                  name: 'awardTitle',
                  type: 'string',
                  description: 'e.g. INDE: The Interior Space Shortlist — Masculine Energy',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Being Sensitive Section',
      name: 'beingSensitiveSection',
      type: 'object',
      fields: [
        {
          title: 'Subheading',
          name: 'subheading',
          type: 'string',
        },
        {
          title: 'Heading',
          name: 'heading',
          type: 'text',
          rows: 3,
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
    },
    {
      title: 'Team Section',
      name: 'teamSection',
      type: 'object',
      fields: [
        {
          title: 'Subheading',
          name: 'subheading',
          type: 'string',
        },
        {
          title: 'Heading',
          name: 'heading',
          type: 'text',
          rows: 3,
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
    },
    {
      title: 'Press Section',
      name: 'pressSection',
      type: 'object',
      fields: [
        {
          title: 'Subheading',
          name: 'subheading',
          type: 'string',
        },
        {
          title: 'Heading',
          name: 'heading',
          type: 'text',
          rows: 3,
        },
      ],
    },
  ],
}
