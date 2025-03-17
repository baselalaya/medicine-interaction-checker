import { HistoryList } from '@/components/dashboard/history-list';

export default function HistoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Interaction History</h1>
      <HistoryList />
    </div>
  );
}
