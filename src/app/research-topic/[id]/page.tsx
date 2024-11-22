import { ResearchTopicDetailContainer } from "@/components/ResearchTopicDetailContainer/ResearchTopicDetailContainer";

const ResearchTopicDetailPage = ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  return (
    <div className="mt-4">
      <ResearchTopicDetailContainer id={params.id} />
    </div>
  );
};
export default ResearchTopicDetailPage;
