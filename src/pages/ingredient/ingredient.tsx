import {Flex, Heading, Button} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import {Table} from "antd";
import {useState, useEffect} from "react";

import {getIngredients} from "../../services/ingredient";
import {IIngredient} from "../../utils/interface";

const Home = () => {
	const [data, setData] = useState<Array<IIngredient>>([]);
	const history = useHistory();

	useEffect(() => {
		async function getInitialData() {
			try {
				const res = await getIngredients();
				setData(res);
			} catch (err: any) {
				console.log(err.message);
			}
		}

		getInitialData();
	}, []);

	return (
		<Flex
			minH='100vh'
			align='center'
			justify='center'
			bg='brand.gray'
			direction='column'
		>
			<Heading marginBottom='5vh'>Ingredient List</Heading>
			<Table dataSource={data}>
				<Table.Column
					title='ID'
					dataIndex='ingredient_id'
					key='ingredient_id'
				/>
				<Table.Column title='Ingredient Name' dataIndex='name' key='name' />
				<Table.Column title='Remaining Stock' dataIndex='stock' key='stock' />
				<Table.Column title='Unit' dataIndex='unit' key='unit' />
				<Table.Column
					title='Action'
					render={(text) => (
						<Button
							color='brand.primary'
							onClick={() => {
								history.push(`/ingredient/${text.ingredient_id}`);
							}}
						>
							Edit
						</Button>
					)}
				/>
			</Table>
		</Flex>
	);
};

export default Home;
