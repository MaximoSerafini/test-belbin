import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rot: number
  vrot: number
}

interface Props {
  colors: string[]
  /** ms; despues de esto las particulas dejan de regenerarse */
  burstMs?: number
}

// Confeti en canvas, sin dependencias externas.
export default function Confetti({ colors, burstMs = 2200 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const pick = () => colors[Math.floor(Math.random() * colors.length)]
    const make = (): Particle => ({
      x: Math.random() * w,
      y: -20 - Math.random() * h * 0.5,
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 4,
      size: 6 + Math.random() * 8,
      color: pick(),
      rot: Math.random() * Math.PI,
      vrot: (Math.random() - 0.5) * 0.3,
    })

    let particles: Particle[] = Array.from({ length: 160 }, make)
    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      ctx.clearRect(0, 0, w, h)
      const bursting = now - start < burstMs
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.04
        p.rot += p.vrot
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      }
      particles = particles.filter((p) => p.y < h + 30)
      if (bursting && particles.length < 160) {
        particles.push(make())
      }
      if (particles.length > 0) {
        raf = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, w, h)
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [colors, burstMs])

  return <canvas ref={ref} className="confetti-canvas" aria-hidden="true" />
}
