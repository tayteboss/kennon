const selectMediaTypeObject = {
  title: 'Select Media Type',
  name: 'mediaType',
  type: 'string',
  options: {
    list: [
      {title: 'Image', value: 'image'},
      {title: 'Video', value: 'video'},
    ],
    layout: 'dropdown',
  },
}

const imageObject = {
  title: 'Image',
  name: 'image',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
    },
  ],
  options: {
    collapsible: false,
    collapsed: false,
  },
}

const videoObject = {
  title: 'Video',
  name: 'video',
  type: 'mux.video',
  options: {
    collapsible: false,
    collapsed: false,
  },
}

const fullMedia = {
  name: 'fullMedia',
  title: 'Full Media',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Optional title go over the image',
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
    {
      title: 'Aspect ratio',
      name: 'aspectRatio',
      type: 'string',
      options: {
        list: [
          {title: 'Full', value: 'full'},
          {title: 'Square - 1:1', value: '1:1'},
        ],
        layout: 'radio',
      },
    },
  ],
  hidden: ({parent}: {parent: any}) => parent?.component !== 'fullMedia',
}

const isolatedMedia = {
  name: 'isolatedMedia',
  title: 'Isolated Media',
  type: 'object',
  fields: [
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
  hidden: ({parent}: {parent: any}) => parent?.component !== 'isolatedMedia',
}

const multiColumnMedia = {
  name: 'multiColumnMedia',
  title: 'Multi Column Media',
  type: 'object',
  fields: [
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
              hidden: ({parent}: any) => parent?.mediaType !== 'image',
            },
            {
              ...videoObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'video',
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
  hidden: ({parent}: {parent: any}) => parent?.component !== 'multiColumnMedia',
}

export {selectMediaTypeObject, imageObject, videoObject, fullMedia, isolatedMedia, multiColumnMedia}
