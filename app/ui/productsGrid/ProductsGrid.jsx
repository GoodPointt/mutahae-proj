'use client';

import React, { useEffect, useState } from 'react';

import {
	Center,
	Flex,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react';

import {
	fetchgetProductsByCategorie,
	fetchProductBySubCategorie,
	fetchProducts,
} from '@/app/lib/api/instance';

import PaginationDisplay from '../paginationDisplay/PaginationDisplay';
import SectionWrapper from '../sectionWrapper/SectionWrapper';

import CategoryMenu from './categoryMenu/CategoryMenu';
import Filter from './filter/Filter';
import ProductList from './productList/ProductList';

import { parseAsInteger, useQueryState } from 'nuqs';

const ProductsGrid = ({
	products,
	lang,
	heading,
	data: categoriesList,
	dictionary,
}) => {
	const [renderList, setRenderList] = useState([]);
	const [categories, setCategories] = useState([]);
	const [activeTab, setActiveTab] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const [category, setCategory] = useQueryState('category');
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
	const [sub_category, setSub_category] = useQueryState('sub_category');
	const [total, setTotal] = useQueryState('total', parseAsInteger);

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				if (category && sub_category) {
					const activeTabIndex =
						categories.findIndex(el => el.id === category) + 1;

					setActiveTab(activeTabIndex);

					const { data, total } = await fetchProductBySubCategorie(
						lang,
						page,
						category,
						sub_category
					);

					setRenderList(data);
					setTotal(total);

					return;
				}

				if (category && !sub_category) {
					const activeTabIndex =
						categories.findIndex(el => el.id === category) + 1;

					setActiveTab(activeTabIndex);

					const { data, total } = await fetchgetProductsByCategorie(
						lang,
						page,
						category
					);

					setRenderList(data);
					setTotal(total);

					return;
				}

				const { data, total } = await fetchProducts(lang, page);

				setRenderList(data);
				setTotal(total);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [categories, category, lang, page, products, setTotal, sub_category]);

	useEffect(() => {
		if (!categoriesList) return;

		const dataCategory = categoriesList.map(item => ({
			title: item.attributes.title,
			id: item.attributes.uid,
			subCategories: item.attributes.sub_categories.data,
			goods: item.attributes.goods.data,
		}));

		const fitredData = dataCategory.filter(item => item.goods.length > 0);

		const categoriesArr = fitredData.reduce((acc, item) => {
			const { title, id } = item;
			const subCategoriesSet = new Set();
			item.goods.forEach(good => {
				good.attributes.sub_categories.data.forEach(subCat => {
					subCategoriesSet.add(
						JSON.stringify({
							uid: subCat.attributes.uid,
							title: subCat.attributes.title,
						})
					);
				});
			});

			const subCategories = Array.from(subCategoriesSet).map(subCat =>
				JSON.parse(subCat)
			);

			acc.push({ title, id, subCategories });

			return acc;
		}, []);

		const sortedCategoriesArr = categoriesArr.sort(
			(a, b) => parseInt(a.id) - parseInt(b.id)
		);

		setCategories(sortedCategoriesArr);
	}, [categoriesList]);

	return (
		<SectionWrapper
			heading={heading}
			bg={'linear-gradient(to right, #434343 0%, black 100%)'}
		>
			<Filter
				category={category}
				categories={categories}
				setCategory={setCategory}
				setSub_category={setSub_category}
				setPage={setPage}
				sub_category={sub_category}
				dictionary={dictionary}
			/>
			<Tabs
				lazyBehavior
				index={activeTab}
				borderBottom={'#a28445'}
				onChange={index => setActiveTab(index)}
				isManual={true}
			>
				<TabList display={{ base: 'none', md: 'flex' }}>
					<Tab
						key={'All'}
						mx={'12px'}
						fontSize={'18px'}
						fontWeight={'500'}
						transition={'all 0.3s'}
						_selected={{ color: '#a28445' }}
						_hover={{
							bg: 'none',
							color: '#a98841',
						}}
						onClick={() => {
							setPage(1);
							setCategory(null);
							setSub_category(null);
						}}
					>
						{dictionary.catalogPage.menu.all}
					</Tab>

					{categories &&
						categories.map(({ id, title, subCategories }) => (
							<Flex
								key={id}
								mx={'12px'}
								stroke={id === category ? '#a28445' : 'white'}
								transition={'all 0.3s'}
								_hover={{
									bg: 'none',
									fill: '#a98841',
									stroke: '#a98841',
									color: '#a98841',
								}}
							>
								<Tab
									px={0}
									_selected={{ color: '#a28445' }}
									fontSize={'18px'}
									fontWeight={'500'}
									onClick={() => {
										setCategory(id), setSub_category(null), setPage(1);
									}}
								>
									{title}
								</Tab>
								<CategoryMenu
									id={id}
									title={title}
									subCategories={subCategories}
									setCategory={setCategory}
									setSub_category={setSub_category}
									setPage={setPage}
									sub_category={sub_category}
								/>
							</Flex>
						))}
				</TabList>
				<TabPanels px={'0'}>
					<TabPanel key={'All'} px={'0'}>
						<ProductList list={renderList} lang={lang} isLoading={isLoading} />
					</TabPanel>
					{categories.map(({ id }) => (
						<TabPanel key={id} px={'0'}>
							<ProductList
								list={renderList}
								lang={lang}
								isLoading={isLoading}
							/>
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
			<Center>
				<PaginationDisplay
					total={total}
					page={page}
					renderList={!!renderList}
					setTotal={setTotal}
					setPage={setPage}
					lang={lang}
				/>
			</Center>
		</SectionWrapper>
	);
};

export default ProductsGrid;
