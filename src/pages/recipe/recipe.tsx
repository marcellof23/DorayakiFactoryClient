import { Flex, Heading, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Table } from "antd";
import { useState, useEffect } from "react";

import { getRecipes } from "../../services/recipe";
import {IIngredient, IIngredientsRecipe, IRecipe} from "../../utils/interface";
import {ColumnGroupType, ColumnType} from "antd/lib/table";
import headingstyle from "../../styles/headingstyle";
import tablestyle from "../../styles/tablestyle";

type iColumns = ColumnGroupType<IRecipe> | ColumnType<IRecipe>;
type iExtendedColumn =
	| ColumnGroupType<IIngredientsRecipe>
	| ColumnType<IIngredientsRecipe>;

const Home = () => {
	const [data, setData] = useState<Array<IRecipe>>([]);
	const history = useHistory();

	useEffect(() => {
		async function getInitialData() {
			try {
				const res = await getRecipes();
				console.log(res);
				setData(res);
			} catch (err: any) {
				console.log(err.message);
			}
		}

		getInitialData();
	}, []);

	const columns: iColumns[] = [
		{
			title: "ID",
			dataIndex: "recipe_id",
			key: "recipe_id",
			sorter: (a: IRecipe, b: IRecipe) => a.recipe_id - b.recipe_id,
		},
		{
			title: "Recipe Name",
			dataIndex: "name",
			key: "name",
			sorter: (a: IRecipe, b: IRecipe) => a.name.localeCompare(b.name),
		},
	];

	const expandedRowRender = (record: IRecipe) => {
		const columns: iExtendedColumn[] = [
			{
				title: "Ingredient Name",
				dataIndex: "name",
				key: "name",
				sorter: (a: IIngredientsRecipe, b: IIngredientsRecipe) =>
					a.name.localeCompare(b.name),
			},
			{
				title: "QTY Required",
				dataIndex: "qty_required",
				key: "qty_required",
				sorter: (a: IIngredientsRecipe, b: IIngredientsRecipe) =>
					a.qty_required - b.qty_required,
			},
			{
				title: "Unit",
				dataIndex: "unit",
				key: "unit",
				sorter: (a: IIngredientsRecipe, b: IIngredientsRecipe) =>
					a.unit.localeCompare(b.unit),
			},
		];

		const data = record.Ingredients.map((row) => ({
			...row,
			qty_required: row.RecipeIngredient.qty_required,
		}));

		console.log("INI DATA", data);

		return <Table columns={columns} dataSource={data} pagination={false} />;
	};

	return (
		<Flex
			minH='100vh'
			align='center'
			justify='center'
			bg='brand.gray'
			direction='column'
		>
			<Heading marginBottom='5vh' style={headingstyle}>
				Recipe List
			</Heading>
			<Table
				rowKey='recipe_id'
				style={tablestyle}
				dataSource={data}
				columns={columns}
				expandable={{expandedRowRender}}
			></Table>
		</Flex>
	);
};

export default Home;
