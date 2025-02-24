import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {muxInput} from 'sanity-plugin-mux-input'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {EarthGlobeIcon, DocumentIcon, CaseIcon} from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {colorInput} from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'Kennon',

  projectId: 'jxwf8xo2',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .icon(EarthGlobeIcon)
              .child(S.editor().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Home Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('Work Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('workPage').documentId('workPage')),
            S.listItem()
              .title('Studio Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('studioPage').documentId('studioPage')),
            S.listItem()
              .title('Being Sensitive Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('sensitivePage').documentId('sensitivePage')),
            S.listItem()
              .title('Press Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('pressPage').documentId('pressPage')),
            S.listItem()
              .title('Contact Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('contactPage').documentId('contactPage')),
            S.divider(),
            S.listItem()
              .title('Private Work')
              .icon(CaseIcon)
              .child(
                S.documentList()
                  .title('Private Work')
                  .schemaType('privateWork')
                  .filter('_type == "privateWork"'),
              ),
            S.listItem()
              .title('Public Work')
              .icon(CaseIcon)
              .child(
                S.documentList()
                  .title('Public Work')
                  .schemaType('publicWork')
                  .filter('_type == "publicWork"'),
              ),
            S.listItem()
              .title('Multi Res Work')
              .icon(CaseIcon)
              .child(
                S.documentList()
                  .title('Multi Res Work')
                  .schemaType('multiResWork')
                  .filter('_type == "multiResWork"'),
              ),
            S.divider(),
            orderableDocumentListDeskItem({
              type: 'privateWork',
              S,
              context,
              title: 'Private Work (Orderable)',
            }),
            orderableDocumentListDeskItem({
              type: 'publicWork',
              S,
              context,
              title: 'Public Work (Orderable)',
            }),
            orderableDocumentListDeskItem({
              type: 'multiResWork',
              S,
              context,
              title: 'Multi Res Work (Orderable)',
            }),
          ])
      },
    }),
    visionTool(),
    muxInput({mp4_support: 'standard'}),
    vercelDeployTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  parts: [
    {
      name: 'part:@sanity/base/theme/variables-style',
      path: './customEditorStyles.css',
    },
  ],
})
