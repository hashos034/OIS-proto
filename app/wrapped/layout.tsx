export default function WrappedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-uu-border p-4 sm:p-8">
      <div className="relative w-full max-w-[375px] h-[812px] bg-uu-black rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-uu-black flex flex-col">
        {children}
      </div>
    </div>
  );
}
