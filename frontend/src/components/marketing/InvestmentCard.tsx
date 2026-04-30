'use client';

import Link from 'next/link';
import { Download, MessageSquare, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { InvestmentItem } from '@/lib/investments';

function escapePdfText(value: string) {
  return value.replace(/[()\\]/g, (match) => `\\${match}`);
}

function normalizePdfText(value: string) {
  return value
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[²]/g, '2')
    .replace(/[^\x20-\x7E]/g, '');
}

function downloadInvestmentPdf(project: InvestmentItem) {
  const rows = [
    'Gozgon Invest Platform',
    project.name,
    `Investment: $${project.amount.toLocaleString('en-US')}`,
    `Indicative ROI: ${project.roi}%`,
    `Payback: ${project.payback} years`,
    project.description,
    'Natijalar bozor sharoitiga bogliq.',
  ];

  const content = rows.map((row, index) => `BT /F1 14 Tf 54 ${760 - index * 28} Td (${escapePdfText(normalizePdfText(row))}) Tj ET`).join('\n');
  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj\n',
    '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n',
    `5 0 obj << /Length ${content.length} >> stream\n${content}\nendstream endobj\n`,
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = ['0000000000 65535 f '];

  for (const object of objects) {
    offsets.push(`${pdf.length.toString().padStart(10, '0')} 00000 n `);
    pdf += object;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${offsets.length}\n${offsets.join('\n')}\ntrailer << /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${project.id}-investment-brief.pdf`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function InvestmentCard({ project }: { project: InvestmentItem }) {
  const progress = Math.min(Math.max(project.roi, 0), 40) / 40 * 100;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent/80">{project.category}</div>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-copy">{project.name}</h3>
        </div>
        <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-sm font-bold text-emerald-300">
          {project.roi}% ROI
        </span>
      </div>

      <p className="mt-4 min-h-14 text-sm leading-6 text-muted">{project.description}</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-muted">Investitsiya</div>
          <div className="mt-1 text-xl font-bold text-copy">${(project.amount / 1000000).toFixed(1)}M</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-muted">Payback</div>
          <div className="mt-1 text-xl font-bold text-accent">{project.payback} yil</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted">
          <span className="inline-flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5" /> ROI profili</span>
          <span>{project.roi}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-accent"
          />
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">Natijalar bozor sharoitiga bog‘liq.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button type="button" variant="outline" onClick={() => downloadInvestmentPdf(project)}>
          <Download className="mr-2 h-4 w-4" />
          PDF yuklab olish
        </Button>
        <Link href="#lead">
          <Button className="w-full">
            <MessageSquare className="mr-2 h-4 w-4" />
            Investor bilan bog‘lanish
          </Button>
        </Link>
      </div>
    </motion.article>
  );
}
