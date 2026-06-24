import { useModuleState } from "@/providers/moduleContext";
import DealView from "./view/deal";

export default function CompanyModuleItemView() {

  const { moduleName } = useModuleState();


  switch (moduleName.value) {
    case "management":
    case "deal":
      return <DealView></DealView>;
    default:
      break;
  }
}
