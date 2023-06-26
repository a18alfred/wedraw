export const generateBrushCursorSVG = (diameter: number, theme: 'light' | 'dark'): string => {
    const main = theme === 'light' ? 'black' : '#fff';
    const dot = theme === 'light' ? '#fff' : 'black';

    return `
      <svg width='${diameter}' height='${diameter}' viewBox='0 0 ${diameter} ${diameter}' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='${diameter / 2}' cy='${diameter / 2}' r='${diameter / 2 - 0.5}' stroke='${main}' fill='transparent' stroke-width='1'/>
         <circle cx='${diameter / 2}' cy='${diameter / 2}' r='1' stroke='${dot}' fill='transparent' stroke-width='1'/>
      </svg>
    `;
};

export const zoomInSVG = (theme: 'light' | 'dark'): string => {
    const main = theme === 'light' ? 'black' : '#fff';

    return `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
  <path fill='${main}' d='M11 6H9v3H6v2h3v3h2v-3h3V9h-3z'/>
  <path fill='${main}' d='M10 2c-4.411 0-8 3.589-8 8s3.589 8 8 8a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z'/>
</svg>
`;
};

export const zoomOutSVG = (theme: 'light' | 'dark'): string => {
    const main = theme === 'light' ? 'black' : '#fff';

    return `
<svg viewBox='0 0 24 24' width='24' height='24'  xmlns='http://www.w3.org/2000/svg'>
  <path fill='${main}' d='M6 9h8v2H6z' />
  <path fill='${main}' d='M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z' />
</svg>
`;
};