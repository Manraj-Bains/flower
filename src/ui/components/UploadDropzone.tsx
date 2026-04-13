import { useCallback, useMemo, useRef, useState } from 'react'

type UploadDropzoneProps = {
  imageUrl: string | null
  disabled?: boolean
  onPickFile: (file: File | null) => void
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(0)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

export function UploadDropzone({ imageUrl, disabled, onPickFile }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [meta, setMeta] = useState<{ name: string; size: number } | null>(null)

  const accept = useMemo(() => 'image/*', [])

  const onClick = useCallback(() => {
    if (disabled) return
    inputRef.current?.click()
  }, [disabled])

  const setFile = useCallback(
    (file: File | null) => {
      onPickFile(file)
      setMeta(file ? { name: file.name, size: file.size } : null)
    },
    [onPickFile],
  )

  const onFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0] ?? null
      if (!file) return
      if (!file.type.startsWith('image/')) return
      setFile(file)
    },
    [setFile],
  )

  return (
    <div className="glass overflow-hidden rounded-3xl shadow-soft">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === 'Enter' || e.key === ' ') onClick()
        }}
        onDragEnter={(e) => {
          if (disabled) return
          e.preventDefault()
          setDragOver(true)
        }}
        onDragOver={(e) => {
          if (disabled) return
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={(e) => {
          if (disabled) return
          e.preventDefault()
          setDragOver(false)
        }}
        onDrop={(e) => {
          if (disabled) return
          e.preventDefault()
          setDragOver(false)
          onFiles(e.dataTransfer.files)
        }}
        className={[
          'relative cursor-pointer select-none p-5 outline-none transition',
          disabled ? 'opacity-60' : 'hover:bg-white/40',
        ].join(' ')}
        aria-label="Upload a flower photo"
      >
        <div
          className={[
            'rounded-2xl border border-dashed p-5 transition',
            dragOver ? 'border-sage-500/50 bg-sage-100/35' : 'border-ink-900/15 bg-white/40',
          ].join(' ')}
        >
          {!imageUrl ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-sage-200/70 via-white/70 to-sky-200/60 shadow-ring">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-ink-900/70">
                  <path
                    d="M12 16V4m0 0 4 4m-4-4L8 8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 20h14a2 2 0 0 0 2-2v-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 14v4a2 2 0 0 0 2 2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="mt-4 text-sm font-semibold tracking-[-0.02em] text-ink-900">
                Drag & drop your flower photo
              </div>
              <div className="mt-1 text-sm text-ink-600">or click to upload (JPG, PNG, HEIC)</div>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-ink-900/5 px-3 py-1 text-xs text-ink-600 shadow-ring">
                  Instant preview
                </span>
                <span className="rounded-full bg-ink-900/5 px-3 py-1 text-xs text-ink-600 shadow-ring">
                  Elegant scan animation
                </span>
                <span className="rounded-full bg-ink-900/5 px-3 py-1 text-xs text-ink-600 shadow-ring">
                  Curated results
                </span>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <div className="relative overflow-hidden rounded-2xl border border-ink-900/10 bg-ink-50 shadow-ring">
                  <img
                    src={imageUrl}
                    alt="Uploaded flower preview"
                    className="h-64 w-full object-cover md:h-72"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-950/35 to-transparent" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-white/75 px-3 py-1 text-xs text-ink-700 shadow-ring">
                    Ready for scan
                  </div>
                </div>
              </div>
              <div className="md:col-span-5">
                <div className="text-sm font-semibold tracking-[-0.02em] text-ink-900">Photo loaded</div>
                <div className="mt-1 text-sm text-ink-600">Tap to replace, or continue to analyze.</div>
                <div className="mt-4 rounded-2xl border border-ink-900/10 bg-white/60 p-4 shadow-ring">
                  <div className="text-xs font-semibold text-ink-700">File</div>
                  <div className="mt-2 text-sm text-ink-800">
                    <div className="truncate">{meta?.name ?? 'Image'}</div>
                    <div className="text-xs text-ink-500">{meta ? formatBytes(meta.size) : ''}</div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-ink-500">
                  Tip: crisp images with a clear bloom profile produce more believable results.
                </div>
              </div>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          disabled={disabled}
          onChange={(e) => onFiles(e.target.files)}
        />
      </div>
    </div>
  )
}

