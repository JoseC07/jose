export default function ShieldDivider() {
  return (
    <div className="relative my-8 md:my-0 md:mx-4 h-full flex items-center justify-center md:flex-col">
      <div className="flex-1 border-t md:border-l md:border-t-0 md:h-full border-slate-700" />
      <div className="bg-slate-800 flex items-center justify-center w-8 h-8 -mx-1 md:-my-1 md:mx-0">
        <span className="transform scale-110">🛡️</span>
      </div>
      <div className="flex-1 border-t md:border-l md:border-t-0 md:h-full border-slate-700" />
    </div>
  );
} 