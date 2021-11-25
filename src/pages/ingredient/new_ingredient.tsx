import {Flex, Heading, Button, IconButton} from "@chakra-ui/react";
import {ChevronLeftIcon} from "@chakra-ui/icons";
import {Form, Input, InputNumber, Select} from "antd";
import {useState} from "react";
import {RouteComponentProps, useHistory} from "react-router-dom";

import {createIngredient} from "../../services/ingredient";
import {IIngredient} from "../../utils/interface";
import {UnitEnum} from "../../utils/enum";
import UnitPicker from "../../components/UnitPicker";
import MiniAlert from "../../components/MiniAlert";
import useAlert from "../../hooks/useAlert";

const AddIngredient = (props: RouteComponentProps) => {
	const history = useHistory();
	const {isVisible, status, message, showAlert} = useAlert();

	const onFinish = async (values: any) => {
		try {
			const payload = {...values};
			await createIngredient(payload);
			showAlert("success", "Ingredient created!");
			setTimeout(() => {
				history.push(`/ingredient`);
			}, 2000);
		} catch (err: any) {
			showAlert("error", err.message);
		}
	};

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
					Create New Ingredient
				</Heading>
				<Form
					onFinish={onFinish}
					autoComplete='off'
					name='Ingredient Form'
					className='form'
				>
					<Form.Item
						label='Ingredient name'
						name='name'
						rules={[
							{required: true, message: "Ingredient name cannot be blank!"},
						]}
						className='form-row'
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Ingredient stock'
						name='stock'
						rules={[
							{required: true, message: "Ingredient stock cannot be blank!"},
						]}
						className='form-row'
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
						className='form-row'
					>
						<UnitPicker onChange={(val) => {}} />
					</Form.Item>
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

export default AddIngredient;
