import { useEffect, useState } from 'react'
import {
  Users,
  Search,
  Target,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  Wrench,
  Check,
  X,
  RotateCw,
} from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import './DevelopmentLifecycle.css'

const STORAGE_KEY = 'ingevora-sdlc-progress'

const STAGE_CONFIGS = {
  1: {
    id: 1,
    icon: Users,
    colors: ['#38bdf8', '#0ea5e9', '#0284c7'],
    eyebrow: 'Stage 1 · Discover',
    title: 'Discover',
    shortDescription: 'Deep-dive into your goals, audience, and technical requirements.',
    summary: 'Understand why the project exists before any solution gets proposed: business goals, target users, constraints, and success metrics.',
    tasks: [
      'Run stakeholder interviews to surface goals and constraints',
      'Define success metrics and project scope',
      'Identify budget, timeline, and compliance boundaries',
      'Document assumptions and open risks',
    ],
    deliverables: [
      'Project charter / brief',
      'Stakeholder map',
      'Success metrics definition',
    ],
    tools: ['Interviews', 'Workshops', 'Miro', 'Notion'],
    duration: '1–2 weeks',
    owner: 'Product / Business Analyst',
  },
  2: {
    id: 2,
    icon: Search,
    colors: ['#818cf8', '#6366f1', '#4f46e5'],
    eyebrow: 'Stage 2 · Research',
    title: 'Research',
    shortDescription: 'Competitive analysis, user research, and technical feasibility.',
    summary: 'Ground the discovery findings in evidence — how competitors solve this, what users actually need, and whether it is technically achievable.',
    tasks: [
      'Analyze competitor products and market gaps',
      'Conduct user interviews and surveys',
      'Prototype spikes to validate technical feasibility',
      'Synthesize findings into actionable insights',
    ],
    deliverables: [
      'Competitive analysis report',
      'User research summary / personas',
      'Feasibility spike results',
    ],
    tools: ['User interviews', 'Surveys', 'SWOT analysis', 'Figma'],
    duration: '1–3 weeks',
    owner: 'UX Research / Product',
  },
  3: {
    id: 3,
    icon: Target,
    colors: ['#a78bfa', '#8b5cf6', '#7c3aed'],
    eyebrow: 'Stage 3 · Planning',
    title: 'Planning',
    shortDescription: 'Roadmap, architecture design, and sprint planning.',
    summary: 'Translate research into a concrete plan: what gets built, in what order, by whom, and how the system will be architected.',
    tasks: [
      'Draft product roadmap and release milestones',
      'Design high-level system architecture',
      'Break work into epics and sprints',
      'Estimate effort and assign ownership',
    ],
    deliverables: [
      'Product roadmap',
      'Architecture diagram',
      'Sprint backlog',
    ],
    tools: ['Jira', 'Linear', 'Architecture diagrams', 'Story pointing'],
    duration: '1–2 weeks',
    owner: 'Engineering Lead / PM',
  },
  4: {
    id: 4,
    icon: Palette,
    colors: ['#f472b6', '#ec4899', '#db2777'],
    eyebrow: 'Stage 4 · UI/UX Design',
    title: 'UI/UX Design',
    shortDescription: 'Wireframes, prototypes, and design system creation.',
    summary: 'Give the plan a face: wireframes evolve into a coherent design system and clickable prototypes ready for engineering handoff.',
    tasks: [
      'Sketch low-fidelity wireframes for key flows',
      'Build a design system',
      'Create high-fidelity clickable prototypes',
      'Run usability testing and iterate',
    ],
    deliverables: [
      'Wireframes',
      'Design system / component library',
      'Interactive prototype',
    ],
    tools: ['Figma', 'Sketch', 'Design tokens', 'Usability testing'],
    duration: '2–4 weeks',
    owner: 'Product Design',
  },
  5: {
    id: 5,
    icon: Code2,
    colors: ['#fb923c', '#f97316', '#ea580c'],
    eyebrow: 'Stage 5 · Development',
    title: 'Development',
    shortDescription: 'Agile sprints with daily standups and weekly demos.',
    summary: 'Build the product in short, inspectable increments so scope, quality, and direction can be corrected continuously.',
    tasks: [
      'Set up repos, environments, and coding standards',
      'Implement features in agile sprints',
      'Run daily standups and code reviews',
      'Demo progress at the end of each sprint',
    ],
    deliverables: [
      'Working software increments',
      'Code documentation',
      'Sprint demo recordings',
    ],
    tools: ['Git', 'CI pipelines', 'Pair programming', 'Code review'],
    duration: 'Ongoing (per sprint)',
    owner: 'Engineering Team',
  },
  6: {
    id: 6,
    icon: ShieldCheck,
    colors: ['#facc15', '#eab308', '#ca8a04'],
    eyebrow: 'Stage 6 · Testing',
    title: 'Testing',
    shortDescription: 'QA, performance, security, and accessibility audits.',
    summary: 'Verify the product actually works — functionally, under load, securely, and for every user — before it reaches production.',
    tasks: [
      'Write and execute functional test cases',
      'Run performance and load testing',
      'Conduct security audits and penetration tests',
      'Verify accessibility compliance',
    ],
    deliverables: [
      'Test plans and reports',
      'Bug/defect log',
      'Accessibility audit results',
    ],
    tools: ['Selenium/Playwright', 'JMeter', 'OWASP ZAP', 'axe DevTools'],
    duration: '1–3 weeks',
    owner: 'QA Engineering',
  },
  7: {
    id: 7,
    icon: Rocket,
    colors: ['#34d399', '#10b981', '#059669'],
    eyebrow: 'Stage 7 · Deployment',
    title: 'Deployment',
    shortDescription: 'CI/CD pipeline setup and production launch.',
    summary: 'Ship the product safely into production with a repeatable pipeline and a plan for rolling back if something goes wrong.',
    tasks: [
      'Set up CI/CD pipeline and release process',
      'Configure production infrastructure and monitoring',
      'Run staged/canary rollout',
      'Prepare rollback and incident-response plan',
    ],
    deliverables: [
      'CI/CD pipeline',
      'Production release',
      'Rollback plan',
    ],
    tools: ['GitHub Actions', 'Docker/Kubernetes', 'Terraform', 'Feature flags'],
    duration: '3–5 days',
    owner: 'DevOps / SRE',
  },
  8: {
    id: 8,
    icon: Wrench,
    colors: ['#fb7185', '#ef4444', '#dc2626'],
    eyebrow: 'Stage 8 · Maintenance',
    title: 'Maintenance',
    shortDescription: 'Monitoring, updates, and feature iterations.',
    summary: 'Keep the product healthy and improving after launch — watching real usage, fixing what breaks, and shipping the next iteration.',
    tasks: [
      'Monitor uptime, errors, and performance',
      'Triage and fix production bugs',
      'Gather user feedback and usage analytics',
      'Plan and ship iterative feature updates',
    ],
    deliverables: [
      'Monitoring dashboards',
      'Patch releases',
      'Iteration backlog',
    ],
    tools: ['Datadog/Grafana', 'Sentry', 'Analytics', 'Feedback tools'],
    duration: 'Ongoing',
    owner: 'Engineering / Product',
  },
}

export function DevelopmentLifecycle() {
  const { t, language } = useLanguage()

  const [completed, setCompleted] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
    } catch {
      return new Set()
    }
  })

  const [activeStage, setActiveStage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Persist completed stages
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
    } catch {
      // fallback
    }
  }, [completed])

  const openStage = (id) => {
    setActiveStage(Number(id))
    setModalOpen(true)
    setPreview(null)
  }

  const closeModal = () => {
    setModalOpen(false)
    setActiveStage(null)
  }

  const toggleComplete = () => {
    if (!activeStage) return
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(activeStage)) {
        next.delete(activeStage)
      } else {
        next.add(activeStage)
      }
      return next
    })
  }

  // Keyboard navigation & modal dismissal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalOpen])

  // Localized data integration
  const getLocalizedStage = (id) => {
    const base = STAGE_CONFIGS[id]
    const localizedStages = t?.home?.lifecycle?.stages
    if (localizedStages && localizedStages[id]) {
      return {
        ...base,
        ...localizedStages[id],
        icon: base.icon,
        colors: base.colors,
      }
    }
    // Fallback to process item in home translation if available
    const processIndex = id - 1
    const pStep = t?.home?.process?.[processIndex]
    if (pStep && language === 'it') {
      return {
        ...base,
        title: pStep.title || base.title,
        shortDescription: pStep.text || base.shortDescription,
      }
    }
    return base
  }

  const activeData = activeStage ? getLocalizedStage(activeStage) : null
  const previewData = preview ? getLocalizedStage(preview.id) : null

  // Localized UI strings
  const labels = t?.home?.lifecycle?.labels || {
    hint: 'Click any stage for full specifications',
    keyTasks: 'Key tasks',
    deliverables: 'Deliverables',
    tools: 'Tools & techniques',
    typicalDuration: 'Typical duration',
    owner: 'Owner',
    markComplete: 'Mark as complete',
    markedComplete: '✓ Marked complete',
    close: 'Close',
  }

  return (
    <div className="sdlc-wrapper">
      <main className="sdlc" aria-label="Software Development Life Cycle">
        {/* CENTER PULSING HUB */}
        <div className="center">
          <div className="center-icon" aria-hidden="true">
            <RotateCw size={32} />
          </div>
        </div>

        {/* CENTER HOVER ZOOM PREVIEW */}
        <div className={`zoom-preview ${preview ? 'show' : ''}`} aria-hidden={!preview}>
          {previewData && (
            <>
              <div
                className="zoom-icon"
                style={{
                  background: `linear-gradient(135deg, ${previewData.colors[0]}, ${previewData.colors[1]})`,
                }}
              >
                <previewData.icon size={28} />
              </div>
              <div className="zoom-title">{previewData.title}</div>
              <div className="zoom-tag">{previewData.duration}</div>
            </>
          )}
        </div>

        {/* ORBIT SYSTEM */}
        <div className={`orbit-system ${modalOpen ? 'paused-by-modal' : ''}`}>
          {/* ORBIT RINGS */}
          <div className="orbit-ring" />
          <div className="energy-ring" />

          {/* 4 ORBITING ENERGY DOTS */}
          <div className="energy-dot" />
          <div className="energy-dot" />
          <div className="energy-dot" />
          <div className="energy-dot" />

          {/* 8 STAGES */}
          {Object.entries(STAGE_CONFIGS).map(([idKey, baseStage]) => {
            const stageId = Number(idKey)
            const stage = getLocalizedStage(stageId)
            const StageIcon = baseStage.icon
            const isCompleted = completed.has(stageId)
            const isActive = activeStage === stageId

            return (
              <article
                key={stageId}
                className={`
                  stage
                  stage${stageId}
                  ${isCompleted ? 'completed' : ''}
                  ${isActive ? 'active' : ''}
                  ${modalOpen ? 'paused-by-modal' : ''}
                `}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label={`${stage.title} - Stage ${stageId}`}
                onClick={() => openStage(stageId)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openStage(stageId)
                  }
                }}
                onMouseEnter={() => {
                  if (!modalOpen) setPreview(baseStage)
                }}
                onMouseLeave={() => setPreview(null)}
                onFocus={() => {
                  if (!modalOpen) setPreview(baseStage)
                }}
                onBlur={() => setPreview(null)}
                style={{
                  '--a': baseStage.colors[0],
                  '--b': baseStage.colors[1],
                  '--c': baseStage.colors[2],
                }}
              >
                {/* OCTAGON ICON */}
                <div className="stage-icon">
                  <StageIcon />
                </div>

                {/* NUMBER BADGE */}
                <div className="stage-number">{stageId}</div>

                {/* COMPLETED BADGE */}
                {isCompleted && (
                  <div className="badge-complete" title="Completed">
                    <Check size={13} strokeWidth={3} />
                  </div>
                )}

                {/* GLASS CONTENT CARD */}
                <div className="stage-content">
                  <h3>{stage.title}</h3>
                  <p>{stage.shortDescription}</p>
                </div>
              </article>
            )
          })}
        </div>

        {/* BOTTOM HINT */}
        <div className="sdlc-hint">{labels.hint}</div>
      </main>

      {/* DETAIL MODAL DIALOG */}
      {modalOpen && activeData && (
        <div
          className="sdlc-overlay open"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal()
            }
          }}
        >
          <div className="sdlc-panel" role="dialog" aria-modal="true" aria-labelledby="sdlc-modal-title">
            <button
              className="sdlc-panel-close"
              onClick={closeModal}
              aria-label={labels.close || 'Close modal'}
            >
              <X size={18} />
            </button>

            <div className="sdlc-panel-header">
              <div
                className="sdlc-panel-icon"
                style={{
                  background: `linear-gradient(135deg, ${activeData.colors[0]}, ${activeData.colors[1]})`,
                }}
              >
                <activeData.icon />
              </div>
              <div>
                <div className="sdlc-panel-eyebrow">{activeData.eyebrow}</div>
                <h2 id="sdlc-modal-title" className="sdlc-panel-title">
                  {activeData.title}
                </h2>
              </div>
            </div>

            <p className="sdlc-panel-summary">{activeData.summary}</p>

            <div className="sdlc-panel-section">
              <p className="sdlc-panel-section-title">{labels.keyTasks}</p>
              <ul className="sdlc-tasklist">
                {activeData.tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </div>

            <div className="sdlc-panel-section">
              <p className="sdlc-panel-section-title">{labels.deliverables}</p>
              <ul className="sdlc-tasklist">
                {activeData.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="sdlc-panel-section">
              <p className="sdlc-panel-section-title">{labels.tools}</p>
              <div className="sdlc-chips">
                {activeData.tools.map((tool) => (
                  <span className="sdlc-chip" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="sdlc-panel-meta">
              <div className="sdlc-meta-item">
                <span className="sdlc-meta-label">{labels.typicalDuration}</span>
                <span className="sdlc-meta-value">{activeData.duration}</span>
              </div>
              <div className="sdlc-meta-item">
                <span className="sdlc-meta-label">{labels.owner}</span>
                <span className="sdlc-meta-value">{activeData.owner}</span>
              </div>
            </div>

            <button
              className={`sdlc-complete-toggle ${completed.has(activeStage) ? 'is-complete' : ''}`}
              onClick={toggleComplete}
            >
              {completed.has(activeStage) ? (
                <>
                  <Check size={16} strokeWidth={2.5} /> {labels.markedComplete}
                </>
              ) : (
                labels.markComplete
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

