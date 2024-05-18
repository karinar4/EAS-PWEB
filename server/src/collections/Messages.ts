import { CollectionConfig } from 'payload/types'

const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'namaChannel',
  },
  access:{
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true
  },
  fields: [
    {
        name: "idUserPengirim",
        type: 'relationship',
        relationTo: 'users',
        required: true
    },
    {
        name: "idUserPenerima",
        type: 'relationship',
        relationTo: 'users',
        required: true
    },
    {
        name: "isiChat",
        type: "text",
        label: "Isi Chat",
        required: true
    }
  ],
}

export default Messages
