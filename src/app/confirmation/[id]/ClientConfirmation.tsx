'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { db } from '../../lib/firebase/config'
import Image from 'next/image'
import TabNavigation from '../../components/TabNavigation'
import {
  UserIcon,
  CalendarIcon,
  ClockIcon,
  ScissorsIcon,
  StickyNoteIcon,
  EuroIcon,
  TimerIcon
} from 'lucide-react'
import { deleteDoc } from 'firebase/firestore'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'





const salonImages = [
  { src: "/images/salon/image1.webp", alt: "Intérieur élégant du salon" },
  { src: "/images/salon/image2.webp", alt: "Intérieur élégant du salon" },
  { src: "/images/salon/image3.webp", alt: "Intérieur élégant du salon" },
  { src: "/images/salon/image4.webp", alt: "Intérieur élégant du salon" },
  { src: "/images/salon/image5.webp", alt: "Intérieur élégant du salon" },
];


export default function ClientConfirmation({ id }: { id: string }) {
  const [rdv, setRdv] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, 'rdvs', id)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setRdv(snap.data())
      }
      setLoading(false)
    }

    fetchData()
  }, [id])

  useEffect(() => {
    // Forcer le déblocage du scroll au premier rendu
    document.body.style.overflow = 'auto'
    document.body.style.position = 'relative'
    document.body.classList.remove('overflow-hidden')
  }, [])

  const handleCancelRdv = async () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")
    if (!confirmed || !rdv) return
  
    try {
      if (rdv.paymentIntentId) {
        const refundRes = await fetch('/api/refund', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentIntentId: rdv.paymentIntentId })
        })
  
        const refundJson = await refundRes.json()
        if (!refundJson.success) {
          throw new Error("Le remboursement a échoué.")
        }
      }
  
      await deleteDoc(doc(db, 'rdvs', id))
      alert("Rendez-vous annulé et remboursé.")
      router.push('/rendez-vous') // redirection vers le menu, modifie si besoin
    } catch (error) {
      console.error("Erreur :", error)
      alert("Une erreur est survenue lors de l'annulation.")
    }
  }

  if (loading) return <p className="text-center p-6">Chargement...</p>
  if (!rdv) return <p className="text-center text-red-500 p-6">Rendez-vous introuvable.</p>

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        overflow: "auto",
        position: "relative"
      }}
    >

      <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center">
        {/* Logo Home centré en haut */}
        <div className="w-full flex justify-center mb-6">
      
        <Image
          src="/images/salon/le-balzac-logo.png"
          alt="Logo du salon"
          width={170}
          height={170}
          className="mb-2"
        />
      </div>


      <div className="w-full rounded-lg bg-black/30  backdrop-blur-md text-white p-4 mb-6 shadow-md space-y-3 text-sm">
  <h2 className="text-lg font-semibold text-white text-center mb-4">
    Votre rendez-vous est confirmé
  </h2>

  <div className="flex items-center gap-2">
    <UserIcon className="w-4 h-4 text-white/70" />
    <span className="font-medium text-white/80">Nom :</span> {rdv.clientName || "—"}
  </div>

  <div className="flex items-center gap-2">
    <CalendarIcon className="w-4 h-4 text-white/70" />
    <span className="font-medium text-white/80">Date :</span>{" "}
    {new Date(rdv.start).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })}
  </div>

  <div className="flex items-center gap-2">
    <ClockIcon className="w-4 h-4 text-white/70" />
    <span className="font-medium text-white/80">Heure :</span>{" "}
    {new Date(rdv.start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
  </div>

  <div className="flex items-center gap-2">
    <ScissorsIcon className="w-4 h-4 text-white/70" />
    <span className="font-medium text-white/80">Prestation :</span> {rdv.serviceTitle || "—"}
  </div>

  <div className="flex items-center gap-2">
    <TimerIcon className="w-4 h-4 text-white/70" />
    <span className="font-medium text-white/80">Durée :</span> {rdv.serviceDuration || "—"} min
  </div>

  <div className="flex items-center gap-2">
    <ScissorsIcon className="w-4 h-4 text-white/70" />
    <span className="font-medium text-white/80">Coiffeur :</span> {rdv.staffId || "—"}
  </div>

  <div className="flex items-center gap-2">
    <EuroIcon className="w-4 h-4 text-white/70" />
    <span className="font-medium text-white/80">Prix :</span> {rdv.price || "—"} €
  </div>

  {rdv.notes && (
    <div className="flex items-start gap-2">
      <StickyNoteIcon className="w-4 h-4 text-white/70 mt-0.5" />
      <div>
        <span className="font-medium text-white/80">Notes :</span> {rdv.notes}
      </div>
    </div>
  )}

  <br></br>

  <Dialog>
  <DialogTrigger asChild>
    <div className="w-full flex justify-center mt-6">
      <Button variant="destructive">Annuler ce rendez-vous</Button>
    </div>
  </DialogTrigger>

  <DialogContent
  className="bg-black/40 backdrop-blur-lg border border-white/10 shadow-xl  rounded-xl"
>

    <DialogHeader>
      <DialogTitle className="text-white text-lg font-bold">Confirmer l’annulation</DialogTitle>
      <DialogDescription className="text-sm text-white/70 mt-2">
        Si vous annulez ce rendez-vous moins de 24h avant l’heure prévue
        le remboursement ne pourra pas être garanti.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4">
      <Button variant="ghost">Retour</Button>
      <Button
        variant="destructive"
        onClick={handleCancelRdv}
      >
        Confirmer l’annulation
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>


</div>



      <TabNavigation salonImages={salonImages} />
      </div>
    </main>
  )
}
