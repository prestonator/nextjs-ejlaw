"use client";
import { Phone, Calendar, Scale, Users, Heart, Gavel, Handshake, DollarSign, Clock, Shield, FileText, Star, MapPin, Quote, Mail, Baby, Coins, BarChart, FileCheck, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useSpring, animated, config } from "@react-spring/web"

export default function Component() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1 },
  })

  const slideUp = useSpring({
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    config: { ...config.molasses, tension: 100, friction: 10 },
  })

  const slideRight = useSpring({
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
    config: { ...config.molasses, tension: 120, friction: 14 },
  })

  const scaleIn = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { ...config.wobbly, tension: 200, friction: 20 },
  })

  return (
    <div className="flex flex-col min-h-screen font-montserrat">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;700&family=Montserrat:wght@400;600&family=Saira:wght@400;600&display=swap');

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Cormorant', serif;
        }

        body {
          font-family: 'Montserrat', sans-serif;
        }

        .font-saira {
          font-family: 'Saira', sans-serif;
        }
      `}</style>

      <animated.header style={fadeIn} className="bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Elton Jenkins Law, P.L.L.C.</div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="#about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </animated.header>

      <animated.section style={fadeIn} className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8">
          <div className="max-w-xl text-center sm:text-left">
            <animated.h1 style={slideRight} className="text-4xl font-extrabold sm:text-5xl">
              Compassionate Legal Support
              <strong className="block font-extrabold text-primary mt-2">
                in Norman, OK
              </strong>
            </animated.h1>

            <animated.p style={slideRight} className="mt-4 max-w-lg sm:text-xl/relaxed">
              Guiding You Through Life's Legal Challenges with 60+ Years of Combined Experience
            </animated.p>

            <animated.div style={slideRight} className="mt-8 flex flex-wrap gap-4 text-center">
              <Button className="w-full sm:w-auto flex items-center justify-center gap-2 font-saira transition-colors duration-300 hover:bg-primary-dark" size="lg">
                <Phone className="h-5 w-5" />
                <a href="tel:+14052173623" className="text-lg">Call (405) 217-3623</a>
              </Button>

              <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-900 font-saira transition-colors duration-300 hover:bg-gray-100" size="lg">
                <Calendar className="h-5 w-5" />
                <span className="text-lg">Request Consultation</span>
              </Button>
            </animated.div>
          </div>
        </div>
      </animated.section>

      <animated.section id="services" style={slideUp} className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Legal Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Gavel, title: "Divorce", description: "Expert guidance through contested and uncontested divorces.", link: "/divorce" },
              { icon: Baby, title: "Custody", description: "Protecting your children's best interests in custody disputes.", link: "/custody" },
              { icon: Coins, title: "Child Support", description: "Ensuring fair child support arrangements for your family.", link: "/child-support" },
              { icon: Handshake, title: "Mediation", description: "Facilitating peaceful resolutions to family disputes.", link: "/mediation" },
              { icon: FileCheck, title: "Paternity", description: "Establishing or contesting paternity for legal rights.", link: "/paternity" },
              { icon: Shield, title: "Guardianship", description: "Assisting in the legal protection of minors and incapacitated adults.", link: "/guardianship" },
            ].map((service, index) => (
              <animated.div
                key={index}
                style={scaleIn}
                className="bg-gray-100 rounded-lg p-6 text-center transition-all duration-300 hover:bg-white hover:shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  <service.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <Link href={service.link} className="text-primary hover:text-primary-dark transition-colors duration-300">
                  Learn More
                </Link>
              </animated.div>
            ))}
          </div>
        </div>
      </animated.section>

      <animated.section id="about" style={slideUp} className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">About Elton Jenkins Law</h2>
          <p className="text-lg text-gray-700 mb-6">
            At Elton Jenkins Law, P.L.L.C., we understand that legal issues can be overwhelming. Our team of experienced attorneys is dedicated to providing compassionate and personalized legal support to guide you through life's most challenging moments.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            With over 60 years of combined experience, we have the expertise to handle a wide range of family law matters, from divorce and custody disputes to guardianship and paternity cases. Our commitment is to protect your rights and interests while striving for the best possible outcome for you and your family.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Scale, title: "60+ Years of Combined Experience", description: "Our attorneys bring decades of experience to your case." },
              { icon: Star, title: "Over 100 Five-Star Reviews", description: "Join countless satisfied clients who've rated us 4.7 stars on Google." },
              { icon: Users, title: "Personalized Legal Support", description: "We tailor our approach to fit your unique situation." },
              { icon: MapPin, title: "Serving Norman & Surrounding Counties", description: "Proudly assisting clients in Norman and nearby communities." },
            ].map((item, index) => (
              <animated.div
                key={index}
                style={scaleIn}
                className="bg-white rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  <item.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </animated.div>
            ))}
          </div>
        </div>
      </animated.section>

      <animated.section style={slideUp} className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Experienced Attorneys</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Elton Jenkins", role: "Founder" },
              { name: "Eric Kroier", role: "Family Law Specialist" },
              { name: "Letitia Ness Brady", role: "Divorce Mediation Expert" },
              { name: "Aaron Kroier", role: "Contested Divorce Attorney" },
            ].map((attorney, index) => (
              <animated.div
                key={index}
                style={scaleIn}
                className="bg-gray-100 rounded-lg shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{attorney.name}</h3>
                <p className="text-gray-600">{attorney.role}</p>
              </animated.div>
            ))}
          </div>
        </div>
      </animated.section>

      <animated.section id="contact" style={slideUp} className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <animated.div
              style={scaleIn}
              className="bg-white rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <Input id="name" name="name" type="text" required className="mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input id="email" name="email" type="email" required className="mt-1" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <Textarea id="message" name="message" required className="mt-1" />
                </div>
                <Button type="submit" className="w-full font-saira">Send Message</Button>
              </form>
            </animated.div>
            <animated.div
              style={scaleIn}
              className="bg-white rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Office</h3>
              <p className="text-gray-700 mb-2">124 E Main Street, Norman, OK 73069</p>
              <div className="flex flex-col space-y-2 mb-4">
                <Button variant="link" className="text-primary font-saira transition-colors duration-300 hover:text-primary-dark justify-start">
                  <Phone className="mr-2 h-5 w-5" />
                  (405) 217-3623
                </Button>
                <Button variant="link" className="text-primary font-saira transition-colors duration-300 hover:text-primary-dark justify-start">
                  <Mail className="mr-2 h-5 w-5" />
                  info@eltonjenkinslaw.com
                </Button>
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.2926500893147!2d-97.44205338474876!3d35.22231868030421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b269c7c7cb3ecb%3A0x1a3c7270df5a8c72!2s124%20E%20Main%20St%2C%20Norman%2C%20OK%2073069!5e0!3m2!1sen!2sus!4v1623345678901!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>
            </animated.div>
          </div>
        </div>
      </animated.section>
    </div>
  )
}