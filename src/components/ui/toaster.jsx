import { useToast } from '@/components/ui/use-toast'

export function Toaster() {
  const { toasts } = useToast()
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`rounded-xl border p-4 shadow-lg ${
            t.variant === 'destructive'
              ? 'border-destructive bg-destructive text-destructive-foreground'
              : 'bg-card text-card-foreground'
          }`}
        >
          {t.title && <p className="text-sm font-semibold">{t.title}</p>}
          {t.description && <p className="text-sm opacity-90">{t.description}</p>}
        </div>
      ))}
    </div>
  )
}

export default Toaster
