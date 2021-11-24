import {FC} from "react";

import {Select} from "antd";
import {UnitEnum} from "../utils/enum";

interface iUnitPicker {
	onChange: (val: string) => void;
	initialValue?: UnitEnum;
}

const UnitPicker: FC<iUnitPicker> = ({onChange, initialValue}) => {
	return (
		<Select defaultValue={initialValue || UnitEnum.gram} onChange={onChange}>
			<Select.Option value={UnitEnum.gram}>{UnitEnum.gram}</Select.Option>
			<Select.Option value={UnitEnum.ml}>{UnitEnum.ml}</Select.Option>
			<Select.Option value={UnitEnum.pcs}>{UnitEnum.pcs}</Select.Option>
			<Select.Option value={UnitEnum.tbsp}>{UnitEnum.tbsp}</Select.Option>
			<Select.Option value={UnitEnum.tsp}>{UnitEnum.tsp}</Select.Option>
		</Select>
	);
};
export default UnitPicker;
