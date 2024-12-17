export default {
  title: 'Site Settings',
  name: 'siteSettings',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
      initialValue: 'Site Settings',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Phone',
      name: 'phone',
      type: 'string',
    },
    {
      title: 'Address',
      name: 'address',
      type: 'text',
      rows: 3,
    },
    {
      title: 'Google Maps Link',
      name: 'googleMapsLink',
      type: 'url',
    },
    {
      title: 'Acknowledgement of Country',
      name: 'aoc',
      type: 'text',
      rows: 5,
    },
    {
      title: 'Instagram URL',
      name: 'instagramUrl',
      type: 'url',
    },
    {
      title: 'Showreel video',
      name: 'showreel',
      type: 'mux.video',
    },
    {
      title: 'Footer tagline',
      name: 'footerTagline',
      type: 'string',
    },
    {
      title: 'Est. Year',
      name: 'estYear',
      type: 'number',
    },
  ],
}
