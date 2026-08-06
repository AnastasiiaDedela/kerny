export function WorkspaceNotice({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[10px] bg-white/[0.04] p-6">
      <p className="text-base leading-[19px] font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-[17px] text-white/50">{description}</p>
    </div>
  );
}
