
import AssessmentForm from "@/components/assessment/AssessmentForm";
import { assessments } from "@/data/assessments";

const PreRetireePage = () => {
  return <AssessmentForm assessment={assessments["pre-retiree"]} />;
};

export default PreRetireePage;