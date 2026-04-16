import './PageBanner.css'

function PageBanner({ title, subtitle }) {
  return (
    <section className="page-banner">
      <div className="page-container-wide">
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </section>
  )
}

export default PageBanner
