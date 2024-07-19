import { Link2, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { CreateLinkModal } from './create-link-modal'

interface Links {
  id: string
  title: string
  url: string
}

export function ImportantLinks() {
  const { tripId } = useParams()
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
  const [links, setLinks] = useState<Links[]>([])

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links))
  }, [tripId])

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true)
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links.map((link) => {
          return (
            <div
              key={link.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  className="block text-zinc-400 truncate hover:text-zinc-200"
                  rel="noreferrer"
                >
                  {link.url}
                </a>
              </div>
              <a href={link.url} target="_blank" rel="noreferrer">
                <Link2 className="text-zinc-400 size-5 shrink-0" />
              </a>
            </div>
          )
        })}
      </div>

      <Button onClick={openCreateLinkModal} variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
    </div>
  )
}
