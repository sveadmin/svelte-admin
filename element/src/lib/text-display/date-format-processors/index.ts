/**
 * Definitions are coming from dateformat function https://blog.stevenlevithan.com/archives/javascript-date-format
 * extended by some definitions from the node library https://github.com/felixge/node-dateformat?tab=readme-ov-file
 * d	Day of the month as digits; no leading zero for single-digit days.
 * dd	Day of the month as digits; leading zero for single-digit days.
 * ddd	Day of the week as a three-letter abbreviation.
 * [NOT SUPPORTED]  DDD  "Ysd", "Tdy" or "Tmw" if date lies within these three days. Else fall back to ddd.
 * dddd	Day of the week as its full name.
 * [NOT SUPPORTED]  DDDD  "Yesterday", "Today" or "Tomorrow" if date lies within these three days. Else fall back to dddd.
 * m	Month as digits; no leading zero for single-digit months.
 * mm	Month as digits; leading zero for single-digit months.
 * mmm	Month as a three-letter abbreviation.
 * mmmm	Month as its full name.
 * yy	Year as last two digits; leading zero for years less than 10.
 * yyyy	Year represented by four digits.
 * h	Hours; no leading zero for single-digit hours (12-hour clock).
 * hh	Hours; leading zero for single-digit hours (12-hour clock).
 * H	Hours; no leading zero for single-digit hours (24-hour clock).
 * HH	Hours; leading zero for single-digit hours (24-hour clock).
 * M	Minutes; no leading zero for single-digit minutes.
 * MM	Minutes; leading zero for single-digit minutes.
 * N  ISO 8601 numeric representation of the day of the week.
 * s	Seconds; no leading zero for single-digit seconds.
 * ss	Seconds; leading zero for single-digit seconds.
 * l or L	Milliseconds. l gives 3 digits. L gives 2 digits.
 * t	Lowercase, single-character time marker string: a or p.
 * tt	Lowercase, two-character time marker string: am or pm.
 * T	Uppercase, single-character time marker string: A or P.
 * TT	Uppercase, two-character time marker string: AM or PM.
 * W  ISO 8601 week number of the year, e.g. 4, 42
 * WW ISO 8601 week number of the year, leading zero for single-digit, e.g. 04, 42
 * Z	US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500
 * [NEW]  ZZ  Full regional timezone name. Used to initialize timezones. eg.: Europe/Berlin
 * [DIFFERENT]  o	GMT/UTC timezone offset, e.g. GMT+1, GMT-8.
 * [DIFFERENT]  p  GMT/UTC timezone offset, e.g. GMT-05:00 or GMT+02:30.
 * S	The date's ordinal suffix (st, nd, rd, or th). Works well with d.
 * '…' or "…"	Literal character sequence. Surrounding quotes are removed.
 * [NOT SUPPORTED] UTC:	Must be the first four characters of the mask. Converts the date from local time to UTC/GMT/Zulu time before applying the mask. The "UTC:" prefix is removed.
 */

export { d } from './d.js'
export { dd } from './dd.js'
export { ddd } from './ddd.js'
export { dddd } from './dddd.js'
export { h } from './h.js'
export { hh } from './hh.js'
export { H } from './h_.js'
export { HH } from './h_h_.js'
export { l } from './l.js'
export { L } from './l_.js'
export { m } from './m.js'
export { mm } from './mm.js'
export { mmm } from './mmm.js'
export { mmmm } from './mmmm.js'
export { M } from './m_.js'
export { MM } from './m_m_.js'
export { N } from './n_.js'
export { o } from './o.js'
export { p } from './p.js'
export { s } from './s.js'
export { ss } from './ss.js'
export { T } from './t_.js'
export { TT } from './t_t_.js'
export { t } from './t.js'
export { tt } from './tt.js'
export { W } from './w_.js'
export { WW } from './w_w_.js'
export { yy } from './yy.js'
export { yyyy } from './yyyy.js'
export { Z } from './z_.js'
export { ZZ } from './z_z_.js'