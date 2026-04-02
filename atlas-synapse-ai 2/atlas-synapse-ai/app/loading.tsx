export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-atlas-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-atlas-primary/30 border-t-atlas-primary" />
        <p className="text-sm text-slate-400">Loading…</p>
      </div>
    </div>
  );
}
