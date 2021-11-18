import {Flex, Heading, Button, IconButton} from "@chakra-ui/react";
import {ChevronLeftIcon} from "@chakra-ui/icons";
import {Form, Input, InputNumber, Select} from "antd";
import {useState, useEffect} from "react";
import {RouteComponentProps, useHistory} from "react-router-dom";

import {getIngredient, updateIngredient} from "../../services/ingredient";
import {IIngredient} from "../../utils/interface";
import {UnitEnum} from "../../utils/enum";

const IngredientDetail = (props: RouteComponentProps) => {
	const [data, setData] = useState<IIngredient>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const history = useHistory();

	useEffect(() => {
		async function getInitialData() {
			try {
				const {id}: any = props.match.params;
				const res = await getIngredient(id);
				setData(res);
			} catch (err: any) {
				console.log(err.message);
			}
			setIsLoading(false);
		}

		getInitialData();
	}, []);

	const onFinish = async (values: any) => {
		try {
			const payload = {...values, ingredient_id: data?.ingredient_id};
			await updateIngredient(payload);
			history.push(`/ingredient`);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	return (
		!isLoading ? (
			<Flex
				minH='100vh'
				align='center'
				justify='center'
				bg='brand.gray'
				direction='column'
			>
				<Heading marginBottom='5vh'>
					{" "}
					<IconButton
						aria-label='back'
						icon={<ChevronLeftIcon />}
						onClick={history.goBack}
					/>{" "}
					Ingredient Detail
				</Heading>
				<Form
					onFinish={onFinish}
					autoComplete='off'
					initialValues={{
						name: data?.name,
						stock: data?.stock,
						unit: data?.unit,
					}}
					name='Ingredient Form'
				>
					<Form.Item
						label='Ingredient name'
						name='name'
						rules={[
							{required: true, message: "Ingredient name cannot be blank!"},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Ingredient stock'
						name='stock'
						rules={[
							{required: true, message: "Ingredient stock cannot be blank!"},
						]}
					>
						<InputNumber />
					</Form.Item>
					<Form.Item
						label='Ingredient unit'
						name='unit'
						rules={[
							{
								enum: ["gram", "ml", "tbsp", "tsp", "pcs"],
								message: "Please input the proper unit",
							},
						]}
					>
						<Select>
							<Select.Option value={UnitEnum.gram}>
								{UnitEnum.gram}
							</Select.Option>
							<Select.Option value={UnitEnum.ml}>{UnitEnum.ml}</Select.Option>
							<Select.Option value={UnitEnum.tbsp}>
								{UnitEnum.tbsp}
							</Select.Option>
							<Select.Option value={UnitEnum.tsp}>{UnitEnum.tsp}</Select.Option>
							<Select.Option value={UnitEnum.pcs}>{UnitEnum.pcs}</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Button type='submit'>Submit</Button>
					</Form.Item>
				</Form>
			</Flex>
		) : null
	);
};

export default IngredientDetail;
