import { FC } from 'react';

const ShieldDivider: FC = () => {
  return (
    <div className="relative my-8 md:my-0 md:mx-8 h-full flex items-center justify-center md:flex-col">
      <div className="flex-1 border-t md:border-l md:border-t-0 md:h-full border-slate-700" />
      <div className="bg-slate-800 flex items-center justify-center h-10">
        <span className="">{" 🛡️   "}</span>
      </div>
      <div className="flex-1 border-t md:border-l md:border-t-0 md:h-full border-slate-700" />
    </div>
  );
};

export default ShieldDivider; 