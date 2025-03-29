import { Link } from "react-router-dom"
import { useState } from "react"
import { Calendar, Clock, Mail, MessageSquare, Phone, User, ArrowRight, Linkedin, Twitter, Github } from "lucide-react"
import { Button } from "../components/ui/button"
import GlobalFooter from "../components/sections/GlobalFooter"

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form Submitted:", { name, email, message })
    setSubmitted(true)
    setTimeout(() => {
      setName("")
      setEmail("")
      setMessage("")
      setSubmitted(false)
    }, 3000)
  }

  const handleBookNowClick = (type: 'premium' | 'quick') => {
    console.log(`Booking clicked for: ${type}`);
    alert(`Redirecting to booking for ${type} session... (Implement actual link)`)
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div id="main-content" className="container mx-auto px-6 py-16 max-w-5xl flex-grow relative z-10">
        <div className="mb-8 flex items-center">
          <Link
            to="/experience"
            className="group flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-medium">Back to Experience</span>
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
              className="w-full group border-yellow-400/30 hover:border-yellow-400 hover:bg-yellow-400/10 text-yellow-400 font-medium text-lg py-3 mt-auto"
            >
              <span className="flex items-center justify-center">Schedule Call <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
            <p className="text-slate-300 mb-4">Fill out the form and I'll get back to you as soon as possible.</p>
            <p className="text-sm text-slate-500 italic mt-4">Contact form inputs (Input, Textarea components) need to be created/imported.</p>
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
                  <a href="mailto:contact@yourdomain.com" className="text-white hover:text-yellow-400 transition-colors">
                     contact@yourdomain.com {/* TODO: Update Email */}
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-yellow-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="text-white">+1 (555) 123-4567</p> {/* TODO: Update Phone */}
                </div>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-4">Connect with me</p>
              <div className="flex space-x-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors" aria-label="LinkedIn Profile">
                  <Linkedin className="h-5 w-5 text-yellow-400" /><span className="sr-only">LinkedIn</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors" aria-label="Twitter Profile">
                  <Twitter className="h-5 w-5 text-yellow-400" /><span className="sr-only">Twitter</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors" aria-label="GitHub Profile">
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

      <GlobalFooter />
    </div>
  )
} 