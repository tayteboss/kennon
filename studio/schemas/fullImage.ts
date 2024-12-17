export default {
  title: 'Full Width Image',
  name: 'fullImage',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      fields: [
        {
          title: 'Alt text',
          name: 'alt',
          type: 'string',
          description: 'Important for SEO and accessibility',
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
    },
  ],
}
