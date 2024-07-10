import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfirmTripModal } from './confirm-trip-modal'
import { InviteGuestsModal } from './invite-guests-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'

export function CreateTripPage() {
  const navigate = useNavigate()
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [emailToInvite, setEmailToInvite] = useState([''])

  function changeGuestsInput() {
    setIsGuestsInputOpen(!isGuestsInputOpen)
  }

  function changeGuestsModal() {
    setIsGuestsModalOpen(!isGuestsModalOpen)
  }

  function changeConfirmTripModal() {
    setIsConfirmTripModalOpen(!isConfirmTripModalOpen)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailToInvite.includes(email)) {
      return
    }

    setEmailToInvite([...emailToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailFromInvite(emailToRemove: string) {
    setEmailToInvite(emailToInvite.filter((e) => e !== emailToRemove))
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    navigate('/trips/123')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />

          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        <div className="space-y-4">
          <DestinationAndDateStep
            changeGuestsInput={changeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              changeConfirmTripModal={changeConfirmTripModal}
              changeGuestsModal={changeGuestsModal}
              emailToInvite={emailToInvite}
            />
          )}
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br />
          com nossos{` `}
          <a href="" className="text-zinc-300 underline">
            termos de uso
          </a>
          {` `}e{` `}
          <a href="" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          addNewEmailToInvite={addNewEmailToInvite}
          changeGuestsModal={changeGuestsModal}
          emailToInvite={emailToInvite}
          removeEmailFromInvite={removeEmailFromInvite}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          changeConfirmTripModal={changeConfirmTripModal}
          createTrip={createTrip}
        />
      )}
    </div>
  )
}
