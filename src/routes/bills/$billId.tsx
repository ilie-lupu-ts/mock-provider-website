import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { getAccountById, getBillById } from "@/data/billing-config";

export const Route = createFileRoute("/bills/$billId")({
  component: BillDetailPage,
});

function BillDetailPage() {
  const { billId } = Route.useParams();
  const bill = getBillById(billId);
  const account = bill ? getAccountById(bill.accountId) : undefined;

  const [blobLoading, setBlobLoading] = useState(false);
  const [blobError, setBlobError] = useState<string | null>(null);

  const handleBlobOpen = async () => {
    if (!bill) return;
    setBlobLoading(true);
    setBlobError(null);

    try {
      const response = await fetch(bill.pdfUrl);
      if (!response.ok) {
        throw new Error("Unable to fetch PDF");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (error) {
      setBlobError(
        error instanceof Error ? error.message : "Unable to open PDF",
      );
    } finally {
      setBlobLoading(false);
    }
  };

  if (!bill || !account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Bill not found
          </h1>
          <p className="text-gray-600">We couldn’t locate this statement.</p>
        </div>
      </div>
    );
  }

  const { pdfOptions } = account;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="text-sm text-gray-500">
            {account.name} • {account.accountNumber}
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {bill.description}
          </h1>
          <p className="text-gray-600">
            Statement date: {bill.date} • Due: {bill.dueDate} • Amount: $
            {bill.amount.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {pdfOptions.allowDirectDownload && (
            <a
              href={bill.pdfUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-cyan-600 text-white px-4 py-2 text-sm font-medium hover:bg-cyan-700 transition-colors"
            >
              Direct download
            </a>
          )}
          {pdfOptions.allowBlobOpen && (
            <button
              type="button"
              onClick={handleBlobOpen}
              disabled={blobLoading}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {blobLoading ? "Opening PDF…" : "Open PDF blob"}
            </button>
          )}
        </div>

        {blobError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {blobError}
          </div>
        )}

        {pdfOptions.showIframe ? (
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
            <iframe
              title="Bill PDF"
              src={bill.pdfUrl}
              className="w-full h-180"
            />
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600">
            This account is configured to hide the embedded PDF preview.
          </div>
        )}
      </div>
    </div>
  );
}
