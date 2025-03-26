import { Summary } from '@/services/other/summary';
import View from './view';

type ModelProp = {
	summary: Summary;
};
function Model(props: ModelProp) {
	return <View summary={props.summary} />;
}

export default Model;
