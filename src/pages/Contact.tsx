import { Link } from "react-router-dom"
import { useState } from "react"
import { Calendar, Clock, Mail, MessageSquare, ArrowRight, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)

  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [newsletterError, setNewsletterError] = useState<string | null>(null)
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)
    setIsSubmittingContact(true)

    console.log("Sending Contact Form Data:", { name, email, message })
    try {
      const response = await axios.post('/api/contact', { name, email, message })

      if (response.data.success) {
        console.log("Contact form submission successful")
        setSubmitted(true)
        setName("")
        setEmail("")
        setMessage("")
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setSubmitError(response.data.message || "An unknown error occurred.")
      }
    } catch (error: any) {
      console.error("Contact form submission error:", error)
      const errMsg = error.response?.data?.message || error.message || "Failed to send message. Please try again later."
      setSubmitError(errMsg)
      setSubmitted(false)
    } finally {
      setIsSubmittingContact(false)
    }
  }

  const handleBookNowClick = (type: 'premium' | 'quick') => {
    console.log(`Booking clicked for: ${type}`)
    let calendlyUrl = ''
    if (type === 'premium') {
        calendlyUrl = 'https://calendly.com/caudillojose5/30-minute-meeting-clone'
    } else if (type === 'quick') {
        calendlyUrl = 'https://calendly.com/caudillojose5/30min'
    }

    if (calendlyUrl) {
        window.open(calendlyUrl, '_blank')
    } else {
        console.error("Calendly URL not set for type:", type)
        alert("Booking link is not available at the moment. Please try again later.")
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    setNewsletterError(null)
    setIsSubmittingNewsletter(true)

    console.log("Sending Newsletter Email:", newsletterEmail)

    try {
      const response = await axios.post('/api/newsletter', { email: newsletterEmail })

      if (response.data.success) {
        console.log("Newsletter subscription successful")
        setNewsletterSubmitted(true)
        setNewsletterEmail("")
        setTimeout(() => setNewsletterSubmitted(false), 5000)
      } else {
        setNewsletterError(response.data.message || "An unknown error occurred.")
      }
    } catch (error: any) {
      console.error("Newsletter subscription error:", error)
      const errMsg = error.response?.data?.message || error.message || "Subscription failed. Please try again."
      setNewsletterError(errMsg)
      setNewsletterSubmitted(false)
    } finally {
      setIsSubmittingNewsletter(false)
    }
  }

  const trackEngagement = async (action: string, metadata?: Record<string, unknown>) => {
    try {
      await axios.post('/api/engagement', {
        action,
        metadata: {
          ...metadata,
          path: window.location.pathname,
          userAgent: navigator.userAgent
        }
      })
    } catch (error) {
      console.error('Error tracking engagement:', error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div id="main-content" className="container mx-auto px-6 py-16 max-w-5xl flex-grow relative z-10">
        <div className="mb-8 flex items-center">
          <Link
            to="/"
            className="group flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="flex flex-col items-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-center relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
              Let's Connect
            </span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl text-center">
            Ready to discuss your project or explore how we can work together? Book a consultation or drop me a message
            below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-xl flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full -z-1"></div>
            <h3 className="text-2xl font-bold flex items-center mb-2">
              <Calendar className="mr-2 h-6 w-6 text-yellow-400" />
              Premium Consultation
            </h3>
            <p className="text-slate-300 mb-4">One-on-one strategy session with detailed feedback.</p>
            <div className="space-y-2 flex-grow mb-4">
              <div className="flex items-center text-slate-300">
                <Clock className="mr-2 h-5 w-5 text-yellow-400 flex-shrink-0" />
                <span>60 minutes, in-depth discussion</span>
              </div>
              <div className="flex items-center text-slate-300">
                <MessageSquare className="mr-2 h-5 w-5 text-yellow-400 flex-shrink-0" />
                <span>Personalized recommendations & roadmap</span>
              </div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 my-4">
              <p className="text-2xl font-bold text-white mb-1">$150 <span className="text-sm font-normal text-slate-400">/ session</span></p>
              <p className="text-sm text-slate-400">Secure payment via Stripe (via Calendly)</p>
            </div>
            <Button
              onClick={() => handleBookNowClick('premium')}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-medium text-lg py-3 mt-auto"
            >
              <span className="relative z-10 flex items-center justify-center">Book Now <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
              <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-xl flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full -z-1"></div>
            <h3 className="text-2xl font-bold flex items-center mb-2">
              <Calendar className="mr-2 h-6 w-6 text-yellow-400" />
              Quick Consultation
            </h3>
            <p className="text-slate-300 mb-4">Brief session to discuss your specific needs.</p>
            <div className="space-y-2 flex-grow mb-4">
              <div className="flex items-center text-slate-300">
                <Clock className="mr-2 h-5 w-5 text-yellow-400 flex-shrink-0" />
                <span>30 minutes, focused discussion</span>
              </div>
              <div className="flex items-center text-slate-300">
                <MessageSquare className="mr-2 h-5 w-5 text-yellow-400 flex-shrink-0" />
                <span>Quick insights and next steps</span>
              </div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 my-4">
              <p className="text-2xl font-bold text-white mb-1">$75 <span className="text-sm font-normal text-slate-400">/ session</span></p>
              <p className="text-sm text-slate-400">Secure payment via Stripe (via Calendly)</p>
            </div>
            <Button
              onClick={() => handleBookNowClick('quick')}
              variant="outline"
              className="w-full group border-yellow-400/30 hover:border-yellow-400 hover:bg-yellow-400/10 text-black font-medium text-lg py-3 mt-auto"
            >
              <span className="flex items-center justify-center">Schedule Call <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
            <p className="text-slate-300 mb-4">Fill out the form and I'll get back to you as soon as possible.</p>
            {submitted && (
                <div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> Your message has been sent. I'll be in touch soon!</span>
                </div>
            )}
             {submitError && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {submitError}</span>
                </div>
            )}
             {!submitted && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                        <Input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Your Name"
                            className="w-full bg-slate-700 border-slate-600 focus:border-yellow-400 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Your Email"
                            className="w-full bg-slate-700 border-slate-600 focus:border-yellow-400 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                        <Textarea
                            id="message"
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            placeholder="Your message..."
                            className="w-full bg-slate-700 border-slate-600 focus:border-yellow-400 focus:ring-yellow-400"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubmittingContact}
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-medium py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                         <span className="relative z-10 flex items-center justify-center">
                            {isSubmittingContact ? 'Sending...' : 'Send Message'}
                            {!isSubmittingContact && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                         </span>
                         {!isSubmittingContact && <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>}
                    </Button>
                </form>
             )}
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
            <p className="text-slate-300 mb-6">Reach out directly or connect with me on social media.</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-yellow-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <a href="mailto:caudillojose5@gmail.com" className="text-white hover:text-yellow-400 transition-colors">
                     caudillojose5@gmail.com
                  </a>
                </div>
              </div>
              
            </div>
            <div className="pt-6 mt-6 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-4">Connect with me</p>
              <div className="flex space-x-4">
                <a href="https://linkedin.com/in/josecaud" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors" aria-label="LinkedIn Profile">
                  <Linkedin className="h-5 w-5 text-yellow-400" /><span className="sr-only">LinkedIn</span>
                </a>
                <a href="https://github.com/josec07" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors" aria-label="GitHub Profile">
                  <Github className="h-5 w-5 text-yellow-400" /><span className="sr-only">GitHub</span>
                </a>
              </div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 mt-6">
              <p className="text-sm text-slate-300">Prefer to schedule a call? Use the booking options above to secure a time.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-400">
            Not ready to commit? Check out my{" "}
            <Link to="/experience" className="text-yellow-400 hover:underline">
              experience and projects
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="bg-slate-800 mx-4 border border-slate-700 rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Escape the Loop: Newsletter</h3>
              <p className="text-slate-300">Subscribe to get notified when new articles and demos are published.</p>
               {newsletterSubmitted && (
                    <p className="text-sm text-green-400 mt-2">Thanks for subscribing!</p>
               )}
               {newsletterError && (
                   <p className="text-sm text-red-400 mt-2">{newsletterError}</p>
               )}
            </div>
            {!newsletterSubmitted && (
                <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                <Input
                    type="email"
                    placeholder="Your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    disabled={isSubmittingNewsletter}
                    aria-label="Newsletter email address"
                    className="bg-slate-700 border border-slate-600 rounded-md focus:border-yellow-400 px-3 py-2 h-10 min-w-[250px] text-sm focus:ring-yellow-400"
                />
                <Button
                    type="submit"
                    disabled={isSubmittingNewsletter}
                    className="bg-yellow-400 text-black hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {isSubmittingNewsletter ? 'Subscribing...' : 'Subscribe'}
                 </Button>
                </form>
            )}
          </div>
        </div>
    </div>
  )
} 