import {
  AtSign,
  CheckCircle2,
  CircleDashed,
  Loader,
  Plus,
  X,
} from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { Participant } from './guests'

interface ManageGuestsModalProps {
  changeGuestsModal: () => void
  emailToInvite: Participant[]
}

export function ManageGuestsModal({
  changeGuestsModal,
  emailToInvite,
}: ManageGuestsModalProps) {
  const { tripId } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  async function inviteGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)

    const data = new FormData(event.currentTarget)

    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    await api.post(`/trips/${tripId}/invites`, {
      email,
    })

    setIsLoading(false)
    window.document.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-lg py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button onClick={changeGuestsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {emailToInvite.map((participant) => {
            return (
              <div
                className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                key={participant.id}
              >
                {participant.is_confirmed ? (
                  <CheckCircle2 className="text-green-400 size-5 shrink-0" />
                ) : (
                  <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                )}
                <span
                  className={` ${participant.is_confirmed ? 'text-zinc-300' : 'text-zinc-500'}`}
                >
                  {participant.email}
                </span>
              </div>
            )
          })}
        </div>

        <div className="w-full h-px bg-zinc-800"></div>

        <form
          onSubmit={inviteGuest}
          className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Digite o email do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              disabled={isLoading}
            />
          </div>

          {!isLoading ? (
            <Button variant="primary" type="submit">
              Convidar <Plus className="size-5 text-lime-950" />
            </Button>
          ) : (
            <Button variant="primary" type="submit" className="bg-lime-300">
              Enviando email
              <Loader className="size-5 text-lime-950 animate-spin" />
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}
