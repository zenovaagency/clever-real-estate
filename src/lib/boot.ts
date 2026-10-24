/**
 * Inline, render-blocking script placed in <head>: flags that JS is running
 * so reveal styles apply before the first paint.
 */
export const bootScript = `document.documentElement.classList.add('js');`;
