import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function createMaster() {
  const payload = await getPayload({ config: configPromise })

  // Check if user already exists
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@nerau.com.br' } },
  })

  if (existing.docs.length > 0) {
    console.log('User admin@nerau.com.br already exists. Updating to master...')
    await payload.update({
      collection: 'users',
      id: existing.docs[0].id,
      data: { role: 'master', name: 'Nerau Admin' },
    })
    console.log('Updated to master role.')
  } else {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@nerau.com.br',
        password: 'Nerau2026',
        name: 'Nerau Admin',
        role: 'master',
      },
    })
    console.log('Master user created: admin@nerau.com.br')
  }

  process.exit(0)
}

createMaster().catch((err) => {
  console.error(err)
  process.exit(1)
})
