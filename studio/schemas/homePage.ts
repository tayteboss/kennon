import {UserIcon} from '@sanity/icons'
import {selectMediaTypeObject, imageObject, videoObject, seoObject} from '../objects'

export default {
  title: 'Home Page',
  name: 'homePage',
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
      title: 'Hero Media',
      name: 'heroMedia',
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
    {
      title: 'Use Being Sensitive Board',
      name: 'useBeingSensitiveBoard',
      type: 'boolean',
    },
    {
      title: 'Being Sensitive Board',
      name: 'beingSensitiveBoard',
      type: 'object',
      fields: [
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
    },
    {
      title: 'Featured Work',
      name: 'featuredWork',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'publicWork'}, {type: 'privateWork'}],
        },
      ],
      validation: (Rule) => Rule.max(6),
    },
    {
      title: 'Studio Section',
      name: 'studioSection',
      type: 'object',
      fields: [
        {
          title: 'Studio Subheading',
          name: 'studioSubheading',
          type: 'string',
        },
        {
          title: 'Studio Heading',
          name: 'studioHeading',
          type: 'text',
        },
        {
          title: 'Studio Media',
          name: 'studioMedia',
          type: 'object',
          fields: [
            selectMediaTypeObject,
            {
              ...imageObject,
              hidden: ({document}: any) =>
                document?.studioSection?.studioMedia?.mediaType !== 'image',
            },
            {
              ...videoObject,
              hidden: ({document}: any) =>
                document?.studioSection?.studioMedia?.mediaType !== 'video',
            },
          ],
        },
      ],
    },
  ],
}
