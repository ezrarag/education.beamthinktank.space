'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { graduationGapSeries } from '@/lib/content'

export function GraduationGapChart({
  title,
  compact = false,
}: {
  title?: string
  compact?: boolean
}) {
  return (
    <div className="rounded-[1.8rem] bg-education-navy p-5 text-white shadow-research sm:p-6">
      {title ? <p className="text-sm uppercase tracking-[0.22em] text-white/60">{title}</p> : null}
      <div className={compact ? 'mt-4 h-[280px]' : 'mt-4 h-[360px]'}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={graduationGapSeries} barGap={8}>
            <CartesianGrid stroke="rgba(255,255,255,0.12)" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.78)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis domain={[60, 100]} tick={{ fill: 'rgba(255,255,255,0.78)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#102744',
                borderRadius: '18px',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff',
              }}
              formatter={(value: number, name) => [`${value.toFixed(1)}%`, name]}
            />
            <Legend wrapperStyle={{ color: '#fff', fontSize: 12 }} />
            <Bar dataKey="blackRate" name="Black students" radius={[8, 8, 0, 0]}>
              {graduationGapSeries.map((entry) => (
                <Cell key={`${entry.year}-black`} fill="#F4A11D" />
              ))}
            </Bar>
            <Bar dataKey="whiteRate" name="White students" radius={[8, 8, 0, 0]}>
              {graduationGapSeries.map((entry) => (
                <Cell key={`${entry.year}-white`} fill="#FFFFFF" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-xs leading-6 text-white/60">Source: Wisconsin DPI / WISEdash annual graduation reporting. Seed data shown for front-end build, spanning 2000-2025.</p>
    </div>
  )
}
