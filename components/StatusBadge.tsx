import type { BillStatus, GrantApplicationStatus, RecordsRequestStatus } from '@/lib/content'

type BadgeStatus = RecordsRequestStatus | GrantApplicationStatus | BillStatus

const STATUS_CLASSES: Record<BadgeStatus, string> = {
  Submitted: 'bg-slate-100 text-slate-700',
  Acknowledged: 'bg-blue-100 text-blue-700',
  Received: 'bg-emerald-100 text-emerald-700',
  'In Analysis': 'bg-amber-100 text-amber-800',
  Complete: 'bg-emerald-100 text-emerald-700',
  Draft: 'bg-slate-100 text-slate-700',
  'Under Review': 'bg-amber-100 text-amber-800',
  Awarded: 'bg-emerald-100 text-emerald-700',
  Declined: 'bg-red-100 text-red-700',
  'In Committee': 'bg-slate-100 text-slate-700',
  'Floor Vote': 'bg-amber-100 text-amber-800',
  Signed: 'bg-emerald-100 text-emerald-700',
  Failed: 'bg-red-100 text-red-700',
}

export function StatusBadge({ status }: { status: BadgeStatus }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_CLASSES[status]}`}>{status}</span>
}
