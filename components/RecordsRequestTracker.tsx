import type { RecordsRequest, RecordsRequestStatus } from '@/lib/content'
import { StatusBadge } from '@/components/StatusBadge'

const statusFlow: RecordsRequestStatus[] = ['Submitted', 'Acknowledged', 'Received', 'In Analysis', 'Complete']

export function RecordsRequestTracker({
  requests,
  editable = false,
  onStatusChange,
}: {
  requests: RecordsRequest[]
  editable?: boolean
  onStatusChange?: (requestId: string, status: RecordsRequestStatus) => void
}) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-education-line bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Agency</th>
              <th className="px-4 py-3 font-medium">Requested Records</th>
              <th className="px-4 py-3 font-medium">Request Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Reference</th>
              <th className="px-4 py-3 font-medium">Analysis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((request) => (
              <tr key={request.id} className="align-top">
                <td className="px-4 py-4 text-slate-800">
                  <p className="font-semibold text-education-navy">{request.agency}</p>
                  <p className="mt-1 text-xs text-slate-500">{request.contactName}</p>
                </td>
                <td className="px-4 py-4 text-slate-700">{request.recordsRequested}</td>
                <td className="px-4 py-4 text-slate-700">{request.requestDate}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={request.status} />
                  {editable && onStatusChange ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {statusFlow.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => onStatusChange(request.id, status)}
                          className="rounded-full border border-education-line px-3 py-1 text-xs font-semibold text-slate-600"
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </td>
                <td className="px-4 py-4 text-slate-700">{request.referenceNumber}</td>
                <td className="px-4 py-4 text-slate-700">
                  {request.dateReceived ? <p>Received: {request.dateReceived}</p> : null}
                  <p className="mt-1">{request.analysisStatus ?? 'Not started.'}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
