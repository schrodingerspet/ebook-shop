import './SectionTitle.css'

function SectionTitle({ title, subtitle, center = false }) {
  return (
    <div className={`section-title ${center ? 'section-title--center' : ''}`}>
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  )
}

export default SectionTitle

