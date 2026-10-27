import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { WorkArchive } from './work-archive'
import type { ArchiveEntry } from '@/types/work'

describe('WorkArchive component', () => {
  const sampleEntries: ArchiveEntry[] = [
    {
      id: 'proj-1',
      kind: 'project',
      slug: 'skinny-cans',
      title: 'Skinny Cans',
      subtitle: 'Accessible e-commerce experience',
      href: '/work/skinny-cans',
      categories: ['client', 'web'],
      type: 'E-commerce & Web',
      year: 2025,
      status: 'Live',
      role: 'Lead Frontend Engineer',
      technologies: ['React', 'Next.js', 'Tailwind CSS'],
    },
    {
      id: 'proj-2',
      kind: 'project',
      slug: 'rawlab-ventures',
      title: 'Rawlab Ventures',
      subtitle: 'Brand and digital presence',
      href: '/work/rawlab-ventures',
      categories: ['web'],
      type: 'Corporate Website',
      year: 2024,
      status: 'Live',
      role: 'Creative Engineer',
      technologies: ['TypeScript', 'GSAP'],
    },
    {
      id: 'exp-1',
      kind: 'lab',
      slug: 'kinetic-typography',
      title: 'Kinetic Typography',
      subtitle: 'WebGL type simulation',
      href: '/lab#kinetic-typography',
      categories: ['experimental'],
      type: 'Creative Interaction',
      year: 2025,
      status: 'Experiment',
      role: 'Creative Technologist',
      technologies: ['Canvas API', 'WebGL'],
    },
  ]

  it('renders the complete curated archive', () => {
    render(<WorkArchive entries={sampleEntries} />)

    expect(screen.getAllByRole('heading', { name: 'Skinny Cans' })).toHaveLength(2)
    expect(screen.getAllByRole('heading', { name: 'Rawlab Ventures' })).toHaveLength(2)
    expect(screen.getAllByRole('heading', { name: 'Kinetic Typography' })).toHaveLength(2)
  })

  it('does not expose search, filters or redundant view controls for four entries', () => {
    render(<WorkArchive entries={sampleEntries} />)

    expect(screen.queryByRole('searchbox')).toBeNull()
    expect(screen.queryByRole('button', { name: /Client work/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /^visual$/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /^index$/i })).toBeNull()
  })
})
