import { Link } from "react-router-dom"
import { useState } from "react"
import {  Mail, MessageSquare, ArrowRight, Brain, Package, Settings, Bot, Database, Sparkles, Wrench, Download, Lightbulb } from "lucide-react"
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

  const handleBookNowClick = (type: 'discovery') => {
    console.log(`Booking clicked for: ${type}`)
    trackEngagement('calendly_click', { type })

    const calendlyUrl = 'https://calendly.com/caudillojose5/30min'

    if (calendlyUrl) {
        window.open(calendlyUrl, '_blank')
    } else {
        console.error("Calendly URL not set for type:", type)
        alert("Booking link is not available at the moment. Please try again later.")
    }
  }

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
        setSubmitError(response.data.message || "An unknown error occurred sending the message.")
        setSubmitted(false)
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
      console.log('Engagement tracked:', { action, metadata })
    } catch (error) {
      console.error('Error tracking engagement:', error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl flex-grow relative z-10">
         <div className="mb-8">
           <Link
             to="/"
             className="group flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
           >
             <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
             <span className="font-medium">Back to Home</span>
           </Link>
         </div>

        <div className="text-center mb-16 border border-yellow-400/30 rounded-lg p-8 bg-slate-800/50 shadow-xl relative overflow-hidden">
           <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl -z-1"></div>
           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl -z-1"></div>
           <Lightbulb className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
           <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
              Strategic Systems Design
           </h1>
           <p className="text-lg sm:text-xl text-slate-300 mb-2 max-w-2xl mx-auto">
             Tools that evolve quietly with your business — from launch to scale.
           </p>
           <p className="text-md sm:text-lg text-slate-400 italic max-w-xl mx-auto">
             "Modular solutions for focused, real-world workflows."
           </p>
         </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
           <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center shadow-lg hover:shadow-yellow-400/10 transition-shadow flex flex-col justify-between">
             <div>
               <MessageSquare className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
               <h2 className="text-xl font-semibold mb-1">Initial Consultation</h2>
               <p className="text-slate-400 text-sm mb-1">30-min strategy session - $25</p>
               <p className="text-xs text-yellow-400/80 italic mb-2">Credited toward your first project</p>
             </div>
             <Button
                onClick={() => handleBookNowClick('discovery')}
                variant="link"
                className="text-yellow-400 hover:text-yellow-300 mt-2 text-sm p-0 h-auto self-center"
              >
                 Book a Call <ArrowRight className="ml-1 h-4 w-4" />
               </Button>
           </div>
           <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center shadow-lg hover:shadow-yellow-400/10 transition-shadow">
             <Package className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
             <h2 className="text-xl font-semibold mb-1">Modular Framework</h2>
             <p className="text-slate-400">Core System Modules</p>
             <a href="#modules" className="text-yellow-400 hover:text-yellow-300 mt-2 text-sm inline-flex items-center">
               Explore Modules <ArrowRight className="ml-1 h-4 w-4" />
             </a>
           </div>
           <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center shadow-lg hover:shadow-yellow-400/10 transition-shadow">
             <Wrench className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
             <h2 className="text-xl font-semibold mb-1">Continuous Care</h2>
             <p className="text-slate-400">Retainers & Enhancements</p>
             <a href="#enhancements" className="text-yellow-400 hover:text-yellow-300 mt-2 text-sm inline-flex items-center">
               View Add-ons <ArrowRight className="ml-1 h-4 w-4" />
             </a>
           </div>
         </div>

         <div id="modules" className="text-center mb-12 pt-8">
           <Package className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
           <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
             Core System Modules
           </h2>
           <p className="text-lg text-slate-300 max-w-2xl mx-auto">
             Select and combine foundational modules for a tailored system build.
           </p>
           <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full mt-4 mx-auto"></div>
         </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
           <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg flex flex-col">
              <div className="flex items-center mb-3">
                 <span className="text-3xl font-bold text-yellow-400 mr-3">A</span>
                 <h3 className="text-2xl font-semibold flex items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> </svg>
                   Web Development
                   <span className="ml-auto text-sm font-normal text-slate-400">$400 - $2000</span>
                 </h3>
              </div>
             <ul className="space-y-1 list-disc list-inside text-slate-300 pl-8 flex-grow text-slate-300/90 text-sm">
               <li>Landing pages / static websites</li>
               <li>Full-stack apps (React/Next + API)</li>
               <li>Shopify or Square store setup</li>
             </ul>
           </div>

           <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg flex flex-col">
             <div className="flex items-center mb-3">
                 <span className="text-3xl font-bold text-yellow-400 mr-3">B</span>
                 <h3 className="text-2xl font-semibold flex items-center">
                   <Settings className="h-6 w-6 mr-2 text-yellow-400" />
                   Infrastructure
                   <span className="ml-auto text-sm font-normal text-slate-400">$400 - $1000+</span>
                 </h3>
             </div>
             <ul className="space-y-1 list-disc list-inside text-slate-300 pl-8 flex-grow text-slate-300/90 text-sm">
               <li>VPS + Docker + Nginx deployment</li>
               <li>CI/CD pipelines (GitHub Actions, Docker)</li>
               <li>Cloud consulting (AWS, GCP)</li>
             </ul>
           </div>

           <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg flex flex-col">
             <div className="flex items-center mb-3">
                 <span className="text-3xl font-bold text-yellow-400 mr-3">C</span>
                 <h3 className="text-2xl font-semibold flex items-center">
                   <Bot className="h-6 w-6 mr-2 text-yellow-400" />
                   AI Tools
                   <span className="ml-auto text-sm font-normal text-slate-400">$1000 - $1800</span>
                 </h3>
             </div>
             <ul className="space-y-1 list-disc list-inside text-slate-300 pl-8 flex-grow text-slate-300/90 text-sm">
               <li>GPT bots / content generators</li>
               <li>Desktop apps (speech-to-text, summarizers)</li>
             </ul>
           </div>

           <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg flex flex-col">
              <div className="flex items-center mb-3">
                 <span className="text-3xl font-bold text-yellow-400 mr-3">D</span>
                 <h3 className="text-2xl font-semibold flex items-center">
                    <Database className="h-6 w-6 mr-2 text-yellow-400" />
                    Business Automation
                    <span className="ml-auto text-sm font-normal text-slate-400">$1500 - $4000</span>
                 </h3>
              </div>
             <ul className="space-y-1 list-disc list-inside text-slate-300 pl-8 flex-grow text-slate-300/90 text-sm">
               <li>Internal dashboards / ERP-lite systems</li>
               <li>Alerts and automated workflows</li>
             </ul>
           </div>

           <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg flex flex-col md:col-span-2 md:mx-auto md:w-1/2">
              <div className="flex items-center mb-3">
                 <span className="text-3xl font-bold text-yellow-400 mr-3">E</span>
                 <h3 className="text-2xl font-semibold flex items-center">
                   <Sparkles className="h-6 w-6 mr-2 text-yellow-400" />
                   Design + SEO
                   <span className="ml-auto text-sm font-normal text-slate-400">$250 - $1000</span>
                 </h3>
              </div>
             <ul className="space-y-1 list-disc list-inside text-slate-300 pl-8 flex-grow text-slate-300/90 text-sm">
               <li>Custom layout & branding</li>
               <li>SEO setup and AI-powered content systems</li>
             </ul>
           </div>
         </div>

         <div id="enhancements" className="mb-16 pt-8">
           <div className="text-center mb-8">
             <Wrench className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
             <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
               System Enhancements & Support
             </h2>
             <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full mt-4 mx-auto"></div>
           </div>
           <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
             <ul className="space-y-3 text-slate-300/90">
               <li className="flex items-center justify-between">
                 <span>Monthly upkeep</span>
                 <span className="font-semibold text-yellow-400">$150 / mo</span>
               </li>
               <li className="flex items-center justify-between">
                 <span>Fixes / hourly support</span>
                 <span className="font-semibold text-yellow-400">$100 / hr</span>
               </li>
               <li className="flex items-center justify-between">
                 <span>Technical pairing or training</span>
                  <span className="font-semibold text-yellow-400">Custom</span>
               </li>
             </ul>
           </div>
         </div>

         <div className="mb-16 pt-8">
           <div className="text-center mb-8">
             <Package className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
               Project Scope & Investment
             </h2>
             <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full mt-4 mx-auto"></div>
           </div>
           <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
             <ul className="space-y-3 text-slate-300/90 text-center">
               <li><span className="font-semibold text-white">Foundation Tier:</span> Focused Launch ($500 – $1000)</li>
               <li><span className="font-semibold text-white">Growth Tier:</span> Scaling Operations ($1500 – $5000+)</li>
               <li><span className="font-semibold text-white">Strategic Tier:</span> Custom System Builds ($3000 – $7500+)</li>
             </ul>
           </div>
         </div>

        <div className="mb-16 pt-8">
            <div className="text-center mb-8">
               <Mail className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
               <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                  Send a Message
               </h2>
               <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Have a specific question or prefer email? Fill out the form below.
               </p>
            </div>
           <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
             {submitted && (
               <div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded relative mb-4 text-center" role="alert">
                 <strong className="font-bold">Success!</strong>
                 <span className="block sm:inline"> Your message has been sent. I'll be in touch soon!</span>
               </div>
             )}
             {submitError && (
               <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded relative mb-4 text-center" role="alert">
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
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
           <Button
             onClick={() => handleBookNowClick('discovery')}
             size="lg"
             className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-medium text-lg py-3 px-8"
           >
             <span className="relative z-10 flex items-center justify-center">
               Schedule Consultation <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
             </span>
             <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
           </Button>
           <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-yellow-400 border-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300 px-8 py-3 text-lg"
              disabled
              onClick={() => alert('PDF download coming soon!')}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Service Overview
            </Button>
         </div>

        <div className="text-center mt-16 pt-12 border-t border-slate-700">
           <Brain className="h-8 w-8 text-yellow-400/80 mx-auto mb-4" />
           <p className="text-lg sm:text-xl text-slate-400 italic max-w-3xl mx-auto">
             "Beyond isolated tools – building integrated systems that adapt and scale alongside your core operations."
           </p>
         </div>

       </div>
    </div>
  )
} 