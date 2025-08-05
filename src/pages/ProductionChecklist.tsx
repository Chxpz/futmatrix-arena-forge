
import ProductionReadinessChecklist from '@/components/ProductionReadinessChecklist';

const ProductionChecklist = () => {
  return (
    <div className="min-h-screen bg-matrix-darker p-6">
      <div className="container mx-auto">
        <ProductionReadinessChecklist />
      </div>
    </div>
  );
};

export default ProductionChecklist;
