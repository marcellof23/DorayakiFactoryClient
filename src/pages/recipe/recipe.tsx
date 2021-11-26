import {Flex, Heading, Button, useStyleConfig} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import {Table} from "antd";
import {useState, useEffect} from "react";
import {ColumnGroupType, ColumnType} from "antd/lib/table";

import {getRecipes} from "../../services/recipe";
import {IIngredientsRecipe, IRecipe} from "../../utils/interface";
import {AddIcon} from "@chakra-ui/icons";

type iColumns = ColumnGroupType<IRecipe> | ColumnType<IRecipe>;
type iExtendedColumn =
	| ColumnGroupType<IIngredientsRecipe>
	| ColumnType<IIngredientsRecipe>;

const Home = () => {
	const [data, setData] = useState<Array<IRecipe>>([]);
	const history = useHistory();
	const ContainerStyle = useStyleConfig("Container");
	const HeadingStyle = useStyleConfig("Heading");

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
		<>
			<Flex __css={ContainerStyle}>
				<Heading marginBottom='5vh' __css={HeadingStyle}>
					Recipe List
				</Heading>
				<Flex
					justify='flex-end'
					direction='row'
					width={"100%"}
					paddingBottom='2.5vh'
				>
					<Button
						rightIcon={<AddIcon />}
						onClick={() => history.push("/recipe/new")}
						bgColor={"brand.primary"}
						color={"brand.white"}
						fontWeight={400}
						_hover={{
							bgColor: "brand.primaryFade",
						}}
					>
						Add New Recipe
					</Button>
				</Flex>
				<Table
					rowKey='recipe_id'
					dataSource={data}
					columns={columns}
					expandable={{expandedRowRender}}
				></Table>
			</Flex>
		</>
	);
};

export default Home;
