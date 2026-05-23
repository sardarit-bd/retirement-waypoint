
import AssessmentForm from "@/components/assessment/AssessmentForm";
import { assessments } from "@/data/assessments";

const RecentRetireePage = () => {
  return <AssessmentForm assessment={assessments["recent-retiree"]} />;
};

export default RecentRetireePage;