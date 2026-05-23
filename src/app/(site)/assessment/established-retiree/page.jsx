
import AssessmentForm from "@/components/assessment/AssessmentForm";
import { assessments } from "@/data/assessments";

const EstablishedRetireePage = () => {
  return <AssessmentForm assessment={assessments["established-retiree"]} />;
};

export default EstablishedRetireePage;