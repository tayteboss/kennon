import {UserIcon} from '@sanity/icons'
import {selectMediaTypeObject, imageObject, videoObject} from '../objects'

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
    {
      title: 'Hero Section',
      name: 'heroSection',
      type: 'object',
      fields: [
        {
          title: 'Hero Video',
          name: 'heroVideo',
          type: 'mux.video',
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
