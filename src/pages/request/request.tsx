import {Flex, Heading, Button, VStack, useStyleConfig} from "@chakra-ui/react";
import {Table, Input, Button as AntButton, Space, Tag} from "antd";
import {useState, useEffect, useRef, Key} from "react";
import Highlighter from "react-highlight-words";
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	ExclamationCircleOutlined,
	SearchOutlined,
} from "@ant-design/icons";

import {IRequest} from "../../utils/interface";
import {getRequests, updateRequest} from "../../services/request";
import {ColumnGroupType, ColumnType} from "antd/lib/table";
import {FilterConfirmProps} from "antd/lib/table/interface";
import {DorayakiRequestStatus} from "../../utils/enum";
import useAlert from "../../hooks/useAlert";
import MiniAlert from "../../components/MiniAlert";

interface ICombinedRequest extends IRequest {
	recipe_name: string;
}

const TAGS = {
	accepted: {
		color: "success",
		icon: <CheckCircleOutlined />,
	},
	denied: {
		color: "error",
		icon: <CloseCircleOutlined />,
	},
	pending: {
		color: "warning",
		icon: <ExclamationCircleOutlined />,
	},
};

const RequestListPage = () => {
	const [data, setData] = useState<Array<ICombinedRequest>>([]);

	const [searchedText, setSearchedText] = useState<string>("");
	const [searchedColumn, setSearchedColumn] = useState<string>("");

	const {isVisible, status, message, showAlert} = useAlert();

	const searchRef = useRef<any>();

	const ContainerStyle = useStyleConfig("Container");
	const HeadingStyle = useStyleConfig("Heading");
	const TableStyle = useStyleConfig("Table");

	const getColumnSearchProps = (
		dataIndex: keyof ICombinedRequest
	): ColumnGroupType<ICombinedRequest> | ColumnType<ICombinedRequest> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{padding: 8}}>
				<Input
					ref={searchRef}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{marginBottom: 8, display: "block"}}
				/>
				<Space>
					<AntButton
						type='primary'
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size='small'
						style={{width: 90}}
					>
						Search
					</AntButton>
					<AntButton
						onClick={() => handleReset(clearFilters)}
						size='small'
						style={{width: 90}}
					>
						Reset
					</AntButton>
					<AntButton
						type='link'
						size='small'
						onClick={() => {
							handleSearch(
								selectedKeys,
								() => confirm({closeDropdown: false}),
								dataIndex
							);
						}}
					>
						Filter
					</AntButton>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{color: filtered ? "#1890ff" : undefined}} />
		),
		onFilter: (value, record: ICombinedRequest) =>
			record[dataIndex]
				? record[dataIndex]
						.toString()
						.toLowerCase()
						.includes(value.toString().toLowerCase())
				: false,
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => searchRef.current.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
					searchWords={[searchedText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	});

	const columns: (
		| ColumnGroupType<ICombinedRequest>
		| ColumnType<ICombinedRequest>
	)[] = [
		{
			title: "ID",
			dataIndex: "dorayakirequest_id",
			sorter: (a: IRequest, b: IRequest) =>
				a.dorayakirequest_id - b.dorayakirequest_id,
		},
		{
			title: "Recipe ID",
			dataIndex: ["Recipe", "recipe_id"],
			sorter: (a: IRequest, b: IRequest) =>
				a.Recipe.recipe_id - b.Recipe.recipe_id,
		},
		{
			title: "Recipe Name",
			dataIndex: ["Recipe", "name"],
			...getColumnSearchProps("recipe_name"),
		},
		{
			title: "Quantity",
			dataIndex: "qty",
			sorter: (a: IRequest, b: IRequest) => a.qty - b.qty,
		},
		{
			title: "Created at",
			dataIndex: "created_at",
			sorter: (a: IRequest, b: IRequest) =>
				new Date(a.created_at) > new Date(b.created_at) ? 1 : -1,
		},
		{
			title: "Status",
			dataIndex: "status",
			filters: [
				{text: "Accepted", value: "accepted"},
				{text: "Pending", value: "pending"},
				{text: "Denied", value: "denied"},
			],
			onFilter: (value: string | number | boolean, record: IRequest) =>
				record.status === value,
			render: (value: DorayakiRequestStatus) => (
				<Tag color={TAGS[value].color} icon={TAGS[value].icon}>
					{value}
				</Tag>
			),
		},
		{
			title: "Action",
			dataIndex: "action",
			render: (_: undefined, record: ICombinedRequest) => {
				if (record.status === DorayakiRequestStatus.pending) {
					return (
						<Space>
							<Button
								colorScheme='teal'
								variant='solid'
								size='sm'
								onClick={() =>
									handleUpdate(
										record.dorayakirequest_id,
										DorayakiRequestStatus.accepted
									)
								}
							>
								Accept
							</Button>
							<Button
								colorScheme='red'
								variant='ghost'
								size='sm'
								onClick={() =>
									handleUpdate(
										record.dorayakirequest_id,
										DorayakiRequestStatus.denied
									)
								}
							>
								Deny
							</Button>
						</Space>
					);
				}
				return <span>No action available</span>;
			},
		},
	];

	useEffect(() => {
		async function getInitialData() {
			try {
				const res = (await getRequests()).map((d) => ({
					...d,
					recipe_name: d.Recipe.name,
				}));

				setData(res);
			} catch (err: any) {
				console.log(err.message);
			}
		}

		getInitialData();
	}, []);

	const handleSearch = (
		selectedKeys: Key[],
		confirm: (param?: FilterConfirmProps | undefined) => void,
		dataIndex: string
	): void => {
		confirm();
		setSearchedText(selectedKeys[0].toString());
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: (() => void) | undefined): void => {
		clearFilters && clearFilters();
		setSearchedText("");
	};

	const handleUpdate = async (
		id: number,
		type: DorayakiRequestStatus
	): Promise<void> => {
		const res = await updateRequest({
			dorayakirequest_id: id,
			status: type,
		});
		if (typeof res === "string") {
			showAlert("error", res);
		} else {
			showAlert("success", `Request ID ${id} ${type}`);
			const newData = Array.from(data).map((d: ICombinedRequest) =>
				d.dorayakirequest_id === id
					? {
							...d,
							status: type,
					  }
					: d
			);
			setData(newData);
		}
	};

	return (
		<Flex __css={ContainerStyle}>
			<Heading marginBottom='5vh' __css={HeadingStyle}>
				Request List
			</Heading>
			<VStack spacing={5}>
				<MiniAlert visible={isVisible} status={status} message={message} />
				<Table
					columns={columns}
					dataSource={data}
					pagination={{
						pageSize: 10,
					}}
				/>
			</VStack>
		</Flex>
	);
};

export default RequestListPage;
