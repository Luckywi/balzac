'use client'

import ClientConfirmation from './ClientConfirmation'

export default function ClientWrapper({ id }: { id: string }) {
  return <ClientConfirmation id={id} />
}
