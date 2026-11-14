import { useState } from "react";
import IncomeCategoryChart from "./IncomeCategoryChart";
import ExpenseCategoryChart from "./ExpenseCategoryChart";
import {
  useGetIncomeBySource,
  useGetExpenseByCategory,
} from "../../hooks/useDashboard";
import Skeleton from "react-loading-skeleton";

type Tab = "income" | "expense";

const DistributionDonutChart = () => {
  const [activeTab, setActiveTab] = useState<Tab>("income");

  const { data: incomeSources, isLoading: isIncomeLoading } =
    useGetIncomeBySource();
  const { data: expenseCategories, isLoading: isExpenseLoading } =
    useGetExpenseByCategory();

  const isLoading = activeTab === "income" ? isIncomeLoading : isExpenseLoading;

  const hasData =
    activeTab === "income"
      ? (incomeSources?.length ?? 0) > 0
      : (expenseCategories?.length ?? 0) > 0;

  return (
    <>
      {/* Tab Switcher */}
      <div className="flex items-center gap-1 bg-cusgrey rounded-lg p-0.5 mb-6">
        <button
          onClick={() => setActiveTab("income")}
          className={`flex-1 text-bs-m md:text-bs font-semibold py-1.5 px-3 rounded-md transition-all duration-200 cursor-pointer ${activeTab === "income"
            ? "bg-cusorange text-cuswhite shadow-sm"
            : "text-cusdarkgrey hover:text-cusblack"
            }`}
        >
          Income
        </button>
        <button
          onClick={() => setActiveTab("expense")}
          className={`flex-1 text-bs-m md:text-bs font-semibold py-1.5 px-3 rounded-md transition-all duration-200 cursor-pointer ${activeTab === "expense"
            ? "bg-cusorange text-cuswhite shadow-sm"
            : "text-cusdarkgrey hover:text-cusblack"
            }`}
        >
          Expense
        </button>
      </div>

      {/* Chart Content */}
      <div className="flex-1 flex items-center justify-center min-h-0 max-h-72 w-full">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <Skeleton circle width={120} height={120} />
            <Skeleton width={100} height={12} />
          </div>
        ) : !hasData ? (
          <div className="flex flex-col items-center gap-2 text-cusdarkgrey">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
            <p className="text-bs-m md:text-bs font-medium">
              No {activeTab} data yet
            </p>
          </div>
        ) : activeTab === "income" ? (
          <IncomeCategoryChart sources={incomeSources ?? []} />
        ) : (
          <ExpenseCategoryChart categories={expenseCategories ?? []} />
        )}
      </div>
    </>
  );
};

export default DistributionDonutChart;
