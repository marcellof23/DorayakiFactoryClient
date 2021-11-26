import {
	Flex,
	Heading,
	Button,
	IconButton,
	FormLabel,
	Grid,
} from "@chakra-ui/react";
import {ChevronLeftIcon, CloseIcon} from "@chakra-ui/icons";
import {Form, Input, InputNumber, Select} from "antd";
import {useState, useEffect} from "react";
import {RouteComponentProps, useHistory} from "react-router-dom";

import {createIngredient, getIngredients} from "../../services/ingredient";
import {IIngredient} from "../../utils/interface";
import {UnitEnum} from "../../utils/enum";
import UnitPicker from "../../components/UnitPicker";
import MiniAlert from "../../components/MiniAlert";
import useAlert from "../../hooks/useAlert";
import {createRecipe} from "../../services/recipe";

interface ISelectedIngredient {
	ingredient_id: number;
	name: string;
	qty_required: number;
	unit: UnitEnum;
}

const AddRecipe = (props: RouteComponentProps) => {
	const [indgredientData, setIngredientData] = useState<Array<IIngredient>>([]);
	const [filteredData, setFilteredData] = useState<Array<IIngredient>>([]);
	const [selectedIngredientID, setSelectedIngredientID] = useState<
		Array<number>
	>([]);
	const [selectedIngredient, setSelectedIngredient] = useState<
		Array<ISelectedIngredient>
	>([]);
	const history = useHistory();
	const [form] = Form.useForm();
	const {isVisible, status, message, showAlert} = useAlert();

	useEffect(() => {
		async function fetchIngredient() {
			const data = await getIngredients();
			setIngredientData(data);
			setFilteredData(data);
		}

		try {
			fetchIngredient();
		} catch (err: any) {
			showAlert("error", err.message);
		}
	}, []);

	const handleSearch = (val: string) => {
		const target = indgredientData.filter(
			(row) =>
				row.name.includes(val) &&
				!selectedIngredientID.includes(row.ingredient_id)
		);
		setFilteredData(target);
	};

	const handleChangeSelect = (val: Array<number>) => {
		const deleted_ids = selectedIngredientID.filter(
			(ingredient_id) => !val.includes(ingredient_id)
		);
		const added_ids = val.filter(
			(ingredient_id) => !selectedIngredientID.includes(ingredient_id)
		);
		let temp = selectedIngredient;
		temp = temp.filter((row) => !deleted_ids.includes(row.ingredient_id));
		let added_ingredients = indgredientData.filter((row) =>
			added_ids.includes(row.ingredient_id)
		);
		const new_ingredient: ISelectedIngredient[] = added_ingredients.map(
			(row) => ({
				ingredient_id: row.ingredient_id,
				name: row.name,
				qty_required: 0,
				unit: row.unit,
			})
		);
		temp = [...temp, ...new_ingredient];
		console.log("INI ID", val);
		console.log("INI INGREDIENT", temp);
		form.setFieldsValue({ingredients: val});
		setSelectedIngredientID((_) => val);
		setSelectedIngredient((_) => temp);
	};

	const removeIngredient = (val: number) => {
		const res = selectedIngredientID.filter((row) => row !== val);
		handleChangeSelect(res);
	};

	const handleIngredientChange = (
		ingredient_id: number,
		qty_required: number
	) => {
		if (qty_required < 0) return;
		let temp = [...selectedIngredient];
		temp = temp.map((row) =>
			row.ingredient_id === ingredient_id ? {...row, qty_required} : row
		);
		setSelectedIngredient(temp);
	};

	const onFinish = async (values: any) => {
		try {
			const payload = {name: values.name, Ingredients: selectedIngredient};
			console.log("CREATING RECIPE", payload);
			await createRecipe(payload);
			setTimeout(() => {
				// history.push(`/ingredient`);
			}, 2000);
		} catch (err: any) {
			showAlert("error", err.message);
		}
	};

	useEffect(() => {
		console.log("REFRESH!");
	}, [selectedIngredient, selectedIngredientID]);

	return (
		<>
			<MiniAlert visible={isVisible} status={status} message={message} />
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
					Create New Recipe
				</Heading>
				<Form
					onFinish={onFinish}
					autoComplete='off'
					name='Recipe Form'
					className='form'
				>
					<Form.Item
						label='Recipe name'
						name='name'
						rules={[{required: true, message: "Recipe name cannot be blank!"}]}
						className='form-row'
					>
						<Input />
					</Form.Item>
					<Form.Item label='Ingredients' name='ingredients'>
						<Select
							mode='multiple'
							placeholder='Please select ingredients for this recipe..'
							onSearch={handleSearch}
							onChange={handleChangeSelect}
							value={selectedIngredientID}
							showSearch
							className='select-ingredient'
						>
							{filteredData.map((row: IIngredient) => (
								<Select.Option
									key={row.ingredient_id}
									value={row.ingredient_id}
								>
									{row.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Flex direction='column' alignItems='center' justifyContent='center'>
						<Heading marginBottom='2vh'>Recipe Detail</Heading>
						<Grid
							templateColumns='3fr 1fr auto auto'
							alignItems='center'
							width='100%'
							gap='10px'
						>
							{[...selectedIngredient].map((row) => (
								<>
									<FormLabel>{row.name}</FormLabel>
									<InputNumber
										value={row.qty_required}
										onChange={(val) =>
											handleIngredientChange(row.ingredient_id, val)
										}
									/>
									<p>{row.unit}</p>
									<CloseIcon
										color='red.500'
										cursor='pointer'
										onClick={() => removeIngredient(row.ingredient_id)}
									/>
								</>
							))}
						</Grid>
					</Flex>
					<Form.Item className='form-row-last'>
						<Button type='submit' className='button'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Flex>
		</>
	);
};

export default AddRecipe;
