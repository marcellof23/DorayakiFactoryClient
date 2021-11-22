import { Flex, Heading, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Table } from "antd";
import { useState, useEffect } from "react";

import { getRecipes } from "../../services/recipe";
import { IIngredient, IRecipe } from "../../utils/interface";

const Home = () => {
  const [data, setData] = useState<Array<IRecipe>>([]);
  const history = useHistory();

  useEffect(() => {
    async function getInitialData() {
      try {
        const res = await getRecipes();
        setData(res);
      } catch (err: any) {
        console.log(err.message);
      }
    }

    getInitialData();
  }, []);

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="brand.gray"
      direction="column"
    >
      <Heading marginBottom="5vh">Ingredient List</Heading>
      <Table rowKey="recipe_id" dataSource={data}>
        <Table.Column title="ID" dataIndex="recipe_id" key="recipe_id" />
        <Table.Column title="Ingredient Name" dataIndex="name" key="name" />
        <Table.Column title="Remaining Stock" dataIndex="stock" key="stock" />
        <Table.Column title="Unit" dataIndex="unit" key="unit" />
        <Table.Column
          title="Action"
          key="recipe_id"
          render={(text) => (
            <Button
              color="brand.primary"
              onClick={() => {
                history.push(`/ingredient/${text.recipe_id}`);
              }}
              key={text.recipe_id}
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
