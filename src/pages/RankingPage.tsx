
import RankingTable from '@/components/ranking/RankingTable';

const RankingPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">CLASSIFICA DI POTENZA</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          La classifica definitiva dei personaggi più potenti dell'universo di Bombardino.
        </p>
      </div>
      
      <RankingTable />
    </div>
  );
};

export default RankingPage;
