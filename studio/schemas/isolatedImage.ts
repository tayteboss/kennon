import {selectMediaTypeObject, imageObject, videoObject} from '../objects'

export default {
  title: 'Isolated Media',
  name: 'isolatedMedia',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      media: 'media',
    },
  },
  fields: [
    {
      title: 'Title',
      name: 'title',
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
          hidden: ({document}: any) => document?.media?.mediaType !== 'image',
        },
        {
          ...videoObject,
          hidden: ({document}: any) => document?.media?.mediaType !== 'video',
        },
      ],
    },
  ],
}
