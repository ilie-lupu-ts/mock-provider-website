import { useMemo } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PAGE_SIZE,
  getAccountById,
  getSortedBills,
} from "@/data/billing-config";

export const Route = createFileRoute("/bills/")({
  validateSearch: (search) => {
    const page = Number(search.page);
    const pageSize = Number(search.pageSize);

    return {
      page: Number.isNaN(page) || page < 1 ? undefined : page,
      pageSize: Number.isNaN(pageSize) || pageSize < 1 ? undefined : pageSize,
    };
  },
  component: BillsPage,
});

function BillsPage() {
  const navigate = Route.useNavigate();
  const { page, pageSize } = Route.useSearch();
  const bills = useMemo(() => getSortedBills(), []);

  const resolvedPageSize = pageSize ?? PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(bills.length / resolvedPageSize));
  const resolvedPage = page ?? 1;
  const currentPage = Math.min(resolvedPage, totalPages);
  const startIndex = (currentPage - 1) * resolvedPageSize;
  const pageBills = bills.slice(startIndex, startIndex + resolvedPageSize);

  const goToPage = (nextPage: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: nextPage,
        pageSize: prev.pageSize ?? resolvedPageSize,
      }),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Bills</h1>
            <p className="text-gray-600">
              All accounts • {bills.length} statements
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent statements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pageBills.map((bill) => {
              const account = getAccountById(bill.accountId);
              return (
                <div
                  key={bill.id}
                  className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="text-sm text-gray-500">
                      {account?.name} • {account?.accountNumber} • Bill #
                      {bill.billNumber}
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {bill.description}
                    </div>
                    <div className="text-sm text-gray-500">
                      Statement date: {bill.date} • Due: {bill.dueDate}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-sm">
                      {bill.status.toUpperCase()}
                    </Badge>
                    <div className="text-lg font-semibold text-gray-900">
                      ${bill.amount.toFixed(2)}
                    </div>
                    <Link
                      to="/bills/$billId"
                      params={{ billId: bill.id }}
                      className="text-cyan-700 font-medium hover:text-cyan-900"
                    >
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-300 px-3 py-1 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-300 px-3 py-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
