import React from 'react';
import { Link } from 'react-router';
import { getLocationFieldNotes, getLocationNotePath } from '../data/locationFieldNotes.js';

export default function LocationFieldNotes({ habitat, regionId }: { habitat: string; regionId?: string }) {
  const notes = getLocationFieldNotes(habitat, regionId);
  if (!notes) return null;

  return (
    <section aria-labelledby="location-field-notes-title" className="border-t border-white/10 pt-8">
      <h2 id="location-field-notes-title" className="text-2xl font-bold">형태별 출현과 진화 계보</h2>
      <p className="mt-3 max-w-3xl text-base leading-7 text-gray-300">{notes.intro}</p>
      <div className="mt-5 divide-y divide-white/10">
        {notes.entries.map(entry => (
          <section key={entry.title} className="py-5 first:pt-0">
            <h3 className="text-lg font-bold">{entry.title}</h3>
            <p className="mt-2 max-w-3xl text-base leading-7 text-gray-300">{entry.description}</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {entry.links.map(link => (
                <li key={`${link.name}-${link.formKey}`}>
                  <Link to={getLocationNotePath(link)} className="inline-flex min-h-6 items-center text-sm font-bold text-violet-300 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
