export default {
  title: 'Work Sense',
  name: 'workSense',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'e.g. "Sounds like" - "Smells like" - "Feels like"',
    },
    {
      title: 'Description',
      name: 'description',
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
      ],
    },
  ],
}
