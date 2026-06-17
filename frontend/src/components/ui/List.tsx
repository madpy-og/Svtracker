import React, { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { formatRupiah } from "../../utils/formatRupiah";
import { TrendingDown, TrendingUp, Trash2, X } from "lucide-react";
import Card from "./Card";

type Props = {
  icon: string;
  sourceName?: string;
  categoryName?: string;
  date: string;
  amount: number;
  onDelete?: () => void;
};

const List = ({ icon, sourceName, categoryName, date, amount, onDelete }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between items-center p-1 md:p-2 rounded-md hover:bg-cusgrey group">
      <div className="flex gap-2 items-center">
        <img
          src={icon}
          alt="income-icon"
          className="w-6 h-6 md:w-8 md:h-8 rounded-full"
        />
        <div className="flex flex-col items-start">
          <p className="text-bs-m md:text-bs text-cusblack font-semibold capitalize whitespace-nowrap">
            {sourceName ? sourceName : categoryName}
          </p>
          <p className="text-capt-m md:text-capt text-cusdarkgrey font-semibold whitespace-nowrap">
            {formatDate(date)}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className={`${sourceName ? "flex items-center rounded-md gap-1 py-1 px-2 whitespace-nowrap bg-success/10 text-success" : "flex items-center rounded-md gap-1 py-1 px-2 whitespace-nowrap bg-danger/10 text-danger"}`}
        >
          {sourceName ? (
            <>
              <p className="text-capt-m md:text-capt font-semibold">
                + {formatRupiah(amount)}
              </p>
              <TrendingUp strokeWidth={2} className="w-3 h-3 md:w-4 md:h-4" />
            </>
          ) : (
            <>
              <p className="text-capt-m md:text-capt font-semibold">
                - {formatRupiah(amount)}
              </p>
              <TrendingDown strokeWidth={2} className="w-3 h-3 md:w-4 md:h-4" />
            </>
          )}
        </div>
        {onDelete && (
          <button
            onClick={() => setShowConfirm(true)}
            className="p-1 rounded-md text-cusdarkgrey hover:bg-danger/10 hover:text-danger transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        )}
      </div>
    </div>
      
      {showConfirm && (
        <>
          <div 
            className="fixed inset-0 z-90 bg-black/40 transition-opacity duration-300 opacity-100"
            onClick={() => setShowConfirm(false)}
          ></div>
          <div className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[420px]">
            <Card className="relative w-full shadow-2xl p-5 md:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-cusgrey pb-3">
                <h2 className="text-h5-m md:text-h5 font-bold text-cusblack">Confirm Deletion</h2>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="p-1 rounded-md text-cusdarkgrey hover:bg-cusgrey hover:text-cusblack transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-bs-m md:text-bs text-cusdarkgrey">
                Are you sure you want to delete this {sourceName ? 'income' : 'expense'} record?
              </p>
              <div className="flex justify-end gap-3 mt-2">
                <button 
                  onClick={() => setShowConfirm(false)} 
                  className="px-4 py-2 rounded-md bg-cusgrey text-cusblack font-semibold hover:bg-cusgrey/80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { onDelete?.(); setShowConfirm(false); }} 
                  className="px-4 py-2 rounded-md bg-danger text-white font-semibold hover:bg-danger/80 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default List;
