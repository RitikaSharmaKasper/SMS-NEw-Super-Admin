/**
 * Pagination - Reusable pagination bar matching Figma design
 *
 * Layout (left → right):
 *   [ 10 ▾ ]    [ ‹ Previous ]  [ 1 ][ 2 ][ 3 ][ … ][ 12 ]  [ Next › ]    1–10 of 65
 *
 * Props:
 *   page             {number}   - current page (1-based)
 *   totalPages       {number}   - total number of pages
 *   perPage          {number}   - currently selected rows per page
 *   onPageChange     {fn}       - called with new page number
 *   onPerPageChange  {fn}       - called with new perPage number
 *   total            {number}   - total record count (for "X–Y of Z")
 *   perPageOptions   {number[]} - optional, defaults to [10, 20, 50, 100]
 */

const DEFAULT_PER_PAGE_OPTIONS = [10, 20, 50, 100];

export default function Pagination({
  page = 1,
  totalPages = 1,
  perPage = 10,
  onPageChange,
  onPerPageChange,
  total = 0,
  perPageOptions = DEFAULT_PER_PAGE_OPTIONS,
}) {
  const safeTotalPages = Math.max(1, totalPages);
  const safePage = Math.min(Math.max(1, page), safeTotalPages);

  // Build smart page list with ellipsis
  function buildPages() {
    if (safeTotalPages <= 7) {
      return Array.from({ length: safeTotalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    const left = Math.max(2, safePage - 1);
    const right = Math.min(safeTotalPages - 1, safePage + 1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < safeTotalPages - 1) pages.push('...');
    pages.push(safeTotalPages);
    return pages;
  }

  const pages = buildPages();
  const from = total > 0 ? (safePage - 1) * perPage + 1 : 0;
  const to   = total > 0 ? Math.min(safePage * perPage, total) : 0;

  return (
    <div className="flex items-center justify-between gap-3 py-2.5 min-h-[3rem]">

      {/* Far Left: rows-per-page dropdown */}
      <div className="flex items-center flex-shrink-0">
        <div className="relative inline-flex items-center">
          <select
            value={perPage}
            onChange={(e) => onPerPageChange?.(Number(e.target.value))}
            className="appearance-none px-2.5 py-1.5 pr-7 text-xs text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 min-w-[3.5rem] bg-no-repeat bg-[right_0.625rem_center] bg-[url('data:image/svg+xml,%3Csvg_xmlns=\x22http://www.w3.org/2000/svg\x22_width=\x2212\x22_height=\x2212\x22_viewBox=\x220_0_12_12\x22%3E%3Cpath_fill=\x22%236b7280\x22_d=\x22M6_8L1_3h10z\x22/%3E%3C/svg%3E')]"
          >
            {perPageOptions.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" className="w-2.5 h-2.5">
              <path d="M1.5 3.5L5 7l3.5-3.5" />
            </svg>
          </span>
        </div>
      </div>

      {/* Center: Previous · page numbers · Next */}
      <div className="flex items-center gap-1.5 flex-shrink-0">

        {/* ‹ Previous */}
        <button
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          onClick={() => onPageChange(Math.max(1, safePage - 1))}
          disabled={safePage === 1}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
            <path d="M10 3L5 8l5 5" />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page number buttons */}
        <div className="flex items-center gap-1">
          {pages.map((p, i) =>
            p === '...' ? (
              <span key={`e-${i}`} className="inline-flex items-center justify-center min-w-6 h-8 text-xs text-gray-400 select-none">…</span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`inline-flex items-center justify-center min-w-8 h-8 px-1.5 rounded-md border border-gray-200 text-xs text-gray-700 bg-white cursor-pointer hover:bg-gray-100 transition-colors flex-shrink-0 ${safePage === p ? 'bg-blue-600 text-white border-blue-600 font-semibold hover:bg-blue-600 hover:text-white' : ''}`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next › */}
        <button
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          onClick={() => onPageChange(Math.min(safeTotalPages, safePage + 1))}
          disabled={safePage === safeTotalPages}
        >
          <span className="hidden sm:inline">Next</span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>

      {/* Far Right: X–Y of Z */}
      <div className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0 hidden sm:block">
        {from}–{to} of {total}
      </div>
    </div>
  );
}
