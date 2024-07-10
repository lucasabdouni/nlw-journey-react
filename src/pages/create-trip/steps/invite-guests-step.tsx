import { ArrowRight, UserRoundPlus } from 'lucide-react'
import { Button } from '../../../components/button'

interface InviteGuestsStepProps {
  changeGuestsModal: () => void
  emailToInvite: string[]
  changeConfirmTripModal: () => void
}

export function InviteGuestsStep({
  changeConfirmTripModal,
  changeGuestsModal,
  emailToInvite,
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button
        type="button"
        onClick={changeGuestsModal}
        className="flex items-center gap-2 flex-1"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailToInvite.length > 0 ? (
          <span className="placeholder-zinc-100 text-lg flex-1 text-left">
            {emailToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="placeholder-zinc-400 text-lg flex-1 text-left">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <Button onClick={changeConfirmTripModal} variant="primary">
        Confirmar viagem <ArrowRight className="size-5 text-lime-950" />
      </Button>
    </div>
  )
}
