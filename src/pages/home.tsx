import {Heading, Flex, Text, Image} from "@chakra-ui/react";
import headingstyle from "../styles/headingstyle";

import RecipeLogo from "../public/recipe.png";
import IngredientLogo from "../public/ingredient.png";
import RequestLogo from "../public/request.png";

const navs = [
	{
		title: "Recipe",
		src: RecipeLogo,
		url: "/recipe",
	},
	{
		title: "Ingredient",
		src: IngredientLogo,
		url: "/ingredient",
	},
	{
		title: "Request",
		src: RequestLogo,
		url: "/request",
	},
];

const Home = () => {
	return (
		<Flex
			minH='100vh'
			align='center'
			justify='center'
			bg='brand.gray'
			direction='column'
		>
			<Heading marginBottom='5vh' style={headingstyle}>
				Dashboard
			</Heading>
			<Flex
				minH='30vh'
				align='center'
				justify='center'
				bg='brand.gray'
				direction='row'
			>
				{navs.map((row) => (
					<Flex
						width='30vh'
						align='center'
						justify='center'
						bg='brand.primaryFade'
						direction='column'
						cursor='pointer'
						padding='medium'
						borderRadius='small'
						marginLeft='medium'
						marginRight='medium'
						onClick={() => (window.location.href = row.url)}
					>
						<Image
							src={row.src}
							alt='recipe-icon'
							width='20vh'
							height='20vh'
							marginBottom='medium'
						/>
						<Text color='brand.white' fontSize='h5' fontWeight={800}>
							{row.title}
						</Text>
					</Flex>
				))}
			</Flex>
		</Flex>
	);
};

export default Home;
