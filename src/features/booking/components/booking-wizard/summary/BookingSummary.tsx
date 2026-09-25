import { BookingSummaryContent } from './BookingSummaryContent';
import { BookingSummaryFooter } from './BookingSummaryFooter';
import { BookingSummaryHeader } from './BookingSummaryHeader';

export function BookingSummary() {
  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-10">
      <BookingSummaryHeader />

      <div className="my-6 flex-1 overflow-y-auto border-t border-gray-200 pr-2">
        <BookingSummaryContent />
      </div>

      <BookingSummaryFooter />
    </div>
  );
}
