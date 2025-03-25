export default function SectionDivider() {
  return (
    <div className="relative my-12">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-700"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-slate-900 px-4 transform rotate-90">⚔️</div>
      </div>
    </div>
  );
} 