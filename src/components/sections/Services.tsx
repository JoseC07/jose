import { Button } from '../ui/button';

export default function Services() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Services</h2>
      <div className="space-y-6">
        <p className="text-lg">
          I offer consultation for ERP and DevOps solutions, plus in-person senior tech support—let's make tech work
          for you.
        </p>
        <div className="flex justify-start">
          <Button 
            variant={'metallic'}
            className="bg-slate-800 hover:bg-slate-700 hover:text-yellow-400 transition-colors"
            onClick={() => window.location.href = 'https://calendly.com/your-username'} // Replace with your Calendly link
            showArrow={true}
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
} 