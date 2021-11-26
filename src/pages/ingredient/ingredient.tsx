import { Flex, Heading, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import {Popconfirm, Table, Form, Typography, Input, InputNumber} from "antd";
import {useState, useEffect} from "react";

import MiniAlert from "../../components/MiniAlert";
import {getIngredients, updateIngredient} from "../../services/ingredient";
import {IIngredient} from "../../utils/interface";
import {ColumnGroupType, ColumnType} from "antd/lib/table";
import UnitPicker from "../../components/UnitPicker";
import tablestyle from "../../styles/tablestyle";
import headingstyle from "../../styles/headingstyle";
import useAlert from "../../hooks/useAlert";
import {AddIcon} from "@chakra-ui/icons";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: any;
	inputType: "number" | "text" | "unit";
	record: IIngredient;
	index: number;
	children: React.ReactNode;
}

interface iCombinedIngredientColumnGroup extends ColumnGroupType<IIngredient> {
	editable: boolean;
}

interface iCombinedIngredientColumn extends ColumnType<IIngredient> {
	editable: boolean;
}

type iColumn = iCombinedIngredientColumnGroup | iCombinedIngredientColumn;

const EditableCell: React.FC<EditableCellProps> = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode =
		inputType === "number" ? (
			<InputNumber />
		) : inputType === "unit" ? (
			<UnitPicker onChange={(_) => {}} initialValue={record.unit} />
		) : (
			<Input />
		);

	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{margin: 0}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const Home = () => {
	const [form] = Form.useForm();
	const [data, setData] = useState<Array<IIngredient>>([]);
	const [editingRow, setEditingRow] = useState<number>(-1);

	const {isVisible, status, message, showAlert} = useAlert();
	const history = useHistory();

	const isEditing = (record: IIngredient) =>
		record.ingredient_id === editingRow;

	const cancel = () => setEditingRow(-1);

	const edit = (record: Partial<IIngredient>) => {
		form.setFieldsValue({...record});
		setEditingRow(record.ingredient_id as number);
	};

	const save = async (ingredient_id: number) => {
		try {
			const payload = (await form.validateFields()) as IIngredient;
			const res = await updateIngredient(ingredient_id, payload);
			const newData = data.map((row: IIngredient) =>
				row.ingredient_id === ingredient_id ? res : row
			);
			setData(newData);
			setEditingRow(-1);
			showAlert("success", "Ingredient updated!");
		} catch (err: any) {
			showAlert("error", err.message);
		}
	};

	useEffect(() => {
		async function getInitialData() {
			try {
				const res = await getIngredients();
				console.log(res);
				setData(res);
			} catch (err: any) {
				console.log(err.message);
			}
		}

		getInitialData();
	}, []);

	const columns: iColumn[] = [
		{
			title: "ID",
			dataIndex: "ingredient_id",
			key: "ingredient_id",
			sorter: (a: IIngredient, b: IIngredient) =>
				a.ingredient_id - b.ingredient_id,
			editable: false,
		},
		{
			title: "Ingredient Name",
			dataIndex: "name",
			key: "name",
			sorter: (a: IIngredient, b: IIngredient) => a.name.localeCompare(b.name),
			editable: true,
		},
		{
			title: "Remaining Stock",
			dataIndex: "stock",
			key: "stock",
			sorter: (a: IIngredient, b: IIngredient) => a.stock - b.stock,
			editable: true,
		},
		{
			title: "Unit",
			dataIndex: "unit",
			key: "unit",
			sorter: (a: IIngredient, b: IIngredient) => a.unit.localeCompare(b.unit),
			editable: true,
		},
		{
			title: "Action",
			dataIndex: "action",
			editable: false,
			render: (_: any, record: IIngredient) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<a
							href='javascript:;'
							onClick={() => save(record.ingredient_id)}
							style={{marginRight: 8}}
						>
							Save
						</a>
						<Popconfirm title='Sure to cancel?' onConfirm={cancel}>
							<a>Cancel</a>
						</Popconfirm>
					</span>
				) : (
					<Typography.Link
						disabled={editingRow !== -1}
						onClick={() => edit(record)}
					>
						Edit
					</Typography.Link>
				);
			},
		},
	];

	const mergedColumns = columns.map((col: any) => {
		if (!col.editable) {
			return col;
		}
		let inputType = "text";
		switch (col.dataIndex) {
			case "stock":
				inputType = "number";
				break;
			case "unit":
				inputType = "unit";
				break;
			default:
				inputType = "text";
				break;
		}
		return {
			...col,
			onCell: (record: IIngredient) => ({
				record,
				inputType,
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	return (
		<>
			<MiniAlert visible={isVisible} status={status} message={message} />
			<Flex
				minH='100vh'
				align='center'
				justify='flex-start'
				bg='brand.gray'
				direction='column'
				padding='10vw'
			>
				<Heading marginBottom='2.5vh' style={headingstyle}>
					Ingredient List
				</Heading>

				<Flex
					justify='flex-end'
					direction='row'
					width={"100%"}
					paddingBottom='2.5vh'
				>
					<Button
						rightIcon={<AddIcon />}
						onClick={() => history.push("/ingredient/new")}
						disabled={editingRow !== -1}
						bgColor={"brand.primary"}
						color={"brand.white"}
						fontWeight={400}
						_hover={{
							bgColor: "brand.primaryFade",
						}}
					>
						Add New Ingredient
					</Button>
				</Flex>

				<Form form={form} component={false}>
					<Table
						components={{
							body: {
								cell: EditableCell,
							},
						}}
						rowKey='ingredient_id'
						dataSource={data}
						columns={mergedColumns}
						style={tablestyle}
					/>
				</Form>
			</Flex>
		</>
	);
};

export default Home;
