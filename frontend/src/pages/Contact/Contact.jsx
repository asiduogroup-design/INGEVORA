import { Container } from '../../components/common/Container'
import { SectionHeading } from '../../components/common/SectionHeading'
import { Send } from 'lucide-react'

export function Contact() {
  return (
    <main className="page">
      <Container>
        <SectionHeading
          title="Contact INGEVORA"
          text="Use the contact form to discuss software, AI, electrical or automation work."
        />
        <form className="form-grid">
          <label>Name *<input required name="name" /></label>
          <label>Email *<input required type="email" name="email" /></label>
          <label>Phone<input name="phone" /></label>
          <label>Company<input name="company" /></label>
          <label>Service Type *
            <select required name="serviceType">
              <option>Software</option>
              <option>Electrical</option>
              <option>AI</option>
              <option>Website</option>
              <option>Mobile App</option>
              <option>Solar</option>
              <option>EV Charging</option>
              <option>Maintenance</option>
              <option>Other</option>
            </select>
          </label>
          <label>Budget<input name="budget" /></label>
          <label>Preferred Contact Method<select name="preferredContact"><option>Email</option><option>Phone</option></select></label>
          <label className="full">Project Description *<textarea required name="projectDescription" rows="6" /></label>
          <button className="btn btn-primary" type="submit"><Send size={18} /> Send Message</button>
        </form>
      </Container>
    </main>
  )
}
