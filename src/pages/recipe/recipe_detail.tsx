import { Flex, Heading, Button, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Form, Input, InputNumber, Select } from "antd";
import { useState, useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";

import { getRecipe, updateRecipe } from "../../services/recipe";
import { IRecipe } from "../../utils/interface";
import { UnitEnum } from "../../utils/enum";

const RecipeDetail = (props: RouteComponentProps) => {
  const [data, setData] = useState<IRecipe>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    async function getInitialData() {
      try {
        const { id }: any = props.match.params;
        const res = await getRecipe(id);
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
      const payload = { ...values, recipe_id: data?.recipe_id };
      await updateRecipe(payload);
      history.push(`/recipe`);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return !isLoading ? (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="brand.gray"
      direction="column"
    >
      <Heading marginBottom="5vh">
        {" "}
        <IconButton
          aria-label="back"
          icon={<ChevronLeftIcon />}
          onClick={history.goBack}
        />{" "}
        Recipe Detail
      </Heading>
      <Form
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          name: data?.name,
        }}
        name="Recipe Form"
      >
        <Form.Item
          label="Recipe name"
          name="name"
          rules={[{ required: true, message: "Recipe name cannot be blank!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Flex>
  ) : null;
};

export default RecipeDetail;
