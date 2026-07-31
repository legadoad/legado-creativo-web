import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Registers our fluid font-size utilities (app/globals.css) as members of
// Tailwind's "font-size" group, so twMerge doesn't confuse them with
// text-color utilities (both share the `text-` prefix) and silently drop them.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'fluid-hero',
            'fluid-h1',
            'fluid-h2',
            'fluid-h3',
            'fluid-lead',
            'fluid-statement',
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
