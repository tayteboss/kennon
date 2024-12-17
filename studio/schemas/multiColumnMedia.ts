import {selectMediaTypeObject, imageObject, videoObject} from '../objects'

export default {
  title: 'Multi Column Media',
  name: 'multiColumnMedia',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      media: 'images.0.image',
    },
  },
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Columns',
      name: 'columns',
      type: 'array',
      description: 'Must be 2-3 images',
      of: [
        {
          title: 'Media',
          name: 'media',
          type: 'object',
          fields: [
            selectMediaTypeObject,
            {
              ...imageObject,
              hidden: ({document}: any) => document?.media?.mediaType !== 'image',
            },
            {
              ...videoObject,
              hidden: ({document}: any) => document?.media?.mediaType !== 'video',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(2).max(3),
    },
    {
      title: 'Aspect ratio',
      name: 'aspectRatio',
      type: 'string',
      options: {
        list: [
          {title: 'Portrait - 3:4', value: '3:4'},
          {title: 'Landscape - 4:3', value: '4:3'},
          {title: 'Square - 1:1', value: '1:1'},
        ],
        layout: 'radio',
      },
    },
  ],
}
