/**
 * The workspace's one-off message card — the shape `ServerList`'s "No servers yet" state
 * established. Used for empty, loading and failed states so a section always says
 * something rather than collapsing to a bare heading.
 */
export function WorkspaceNotice({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[10px] bg-white/[0.04] p-6">
      <p className="text-base leading-[19px] font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-[17px] text-white/50">{description}</p>
    </div>
  );
}
