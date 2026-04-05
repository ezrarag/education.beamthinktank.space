import type { AdvocacyContact, BillStatus } from '@/lib/content'
import { StatusBadge } from '@/components/StatusBadge'

const billStatusFlow: BillStatus[] = ['In Committee', 'Floor Vote', 'Signed', 'Failed']

export function AdvocacyTracker({
  contacts,
  editable = false,
  onStatusChange,
}: {
  contacts: AdvocacyContact[]
  editable?: boolean
  onStatusChange?: (contactId: string, status: BillStatus) => void
}) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-education-line bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Legislator</th>
              <th className="px-4 py-3 font-medium">District</th>
              <th className="px-4 py-3 font-medium">Party</th>
              <th className="px-4 py-3 font-medium">Last Contact</th>
              <th className="px-4 py-3 font-medium">Method</th>
              <th className="px-4 py-3 font-medium">Outcome</th>
              <th className="px-4 py-3 font-medium">Bill</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {contacts.map((contact) => (
              <tr key={contact.id} className="align-top">
                <td className="px-4 py-4 font-semibold text-education-navy">{contact.legislatorName}</td>
                <td className="px-4 py-4 text-slate-700">{contact.district}</td>
                <td className="px-4 py-4 text-slate-700">{contact.party}</td>
                <td className="px-4 py-4 text-slate-700">{contact.lastContactDate}</td>
                <td className="px-4 py-4 text-slate-700">{contact.contactMethod}</td>
                <td className="px-4 py-4 text-slate-700">
                  <p>{contact.outcome}</p>
                  {contact.testimonySubmitted ? <p className="mt-2 text-xs font-semibold text-emerald-700">Testimony submitted</p> : null}
                </td>
                <td className="px-4 py-4">
                  <p className="mb-2 font-medium text-slate-700">{contact.relatedBillNumber}</p>
                  <StatusBadge status={contact.billStatus} />
                  {editable && onStatusChange ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {billStatusFlow.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => onStatusChange(contact.id, status)}
                          className="rounded-full border border-education-line px-3 py-1 text-xs font-semibold text-slate-600"
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
