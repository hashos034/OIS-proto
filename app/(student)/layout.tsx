export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4 sm:p-8">
      <div className="relative w-full max-w-[375px] h-[812px] bg-uu-surface rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-uu-black flex flex-col">
        {/* Status bar mock */}
        <div className="flex-shrink-0 h-11 bg-white flex items-center justify-between px-6 pt-2">
          <span className="text-xs font-semibold text-uu-text">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2.5 border border-uu-text rounded-sm relative">
              <div className="absolute inset-[1px] right-[2px] bg-uu-text rounded-[1px]" />
            </div>
          </div>
        </div>
        {/* Page content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
