import type { ReactNode } from "react";

import { RevisionTriangle } from "~/components/revision-triangle";
import { cn } from "~/lib/utils";

type Note = {
  number: string | number;
  label?: string;
  body: ReactNode;
};

type NotesColumnProps = {
  title?: string;
  notes: Note[];
  className?: string;
};

export function NotesColumn({ title = "General notes", notes, className }: NotesColumnProps) {
  return (
    <aside className={cn("cv-paper-flat", className)}>
      <div className="border-b border-cv-rule-soft px-4 py-2">
        <p className="cv-slug">{title}</p>
      </div>
      <ul className="divide-y divide-cv-rule-soft">
        {notes.map((note) => (
          <li key={`${note.number}`} className="flex gap-3 px-4 py-3">
            <RevisionTriangle number={note.number} />
            <div className="min-w-0">
              {note.label ? <p className="cv-slug-copper mb-1">{note.label}</p> : null}
              <div className="text-sm leading-relaxed text-cv-graphite">{note.body}</div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
