import LaundryDetail from '@/components/pages/services/laundry/components/laundry-detail';

const LaundryDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div className="my-container">
      <LaundryDetail id={id} />
    </div>
  );
};

export default LaundryDetailPage;
