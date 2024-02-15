'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import {
	Box,
	Center,
	Flex,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from '@chakra-ui/react';

import {
	fetchgetProductsByCategorie,
	fetchProductBySubCategorie,
	fetchProducts,
	fetchProductsByQuery,
} from '@/app/lib/api/instance';

import ScrollToTopButton from '../scrollToTopButton/ScrollToTopButton';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import SkeletotonClientProductGrid from '../skeletons/SkeletotonClientProductGrid';

import CategoryMenu from './categoryMenu/CategoryMenu';
import MobileFilterMenu from './mobileFilterMenu/MobileFilterMenu';
import ProductList from './productList/ProductList';
import SortMenu from './sortMenu/SortMenu';

import {
	parseAsInteger,
	parseAsString,
	parseAsStringLiteral,
	useQueryState,
} from 'nuqs';

const ProductsGrid = ({
	lang,
	heading,
	data: categoriesList,
	dictionary,
	favorites,
}) => {
	const [renderList, setRenderList] = useState([]);
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [activeTab, setActiveTab] = useState(0);

	const searchParams = useSearchParams();

	const [category, setCategory] = useQueryState('category');
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
	const [sub_category, setSub_category] = useQueryState('sub_category');
	const [total, setTotal] = useQueryState('total', parseAsInteger);
	const [query, setQuery] = useQueryState(
		'query',
		parseAsString.withDefault(searchParams.get('query'))
	);
	const [sortValue, setSortValue] = useQueryState(
		'sort',
		parseAsString.withDefault('publishedAt')
	);

	const sortOrders = ['asc', 'desc'];
	const sortValues = ['price', 'thickness', 'width', 'length'];

	const [sortOrder, setSortOrder] = useQueryState(
		'sort_order',
		parseAsStringLiteral(sortOrders).withDefault('asc')
	);

	const loader = useRef(null);

	const hasNext = parseInt(9) * (parseInt(page) - 1) + parseInt(9) < total;

	const observerCallback = useCallback(
		entities => {
			const target = entities[0];
			if (target.isIntersecting) {
				setPage(prev => prev + 1);
			}
		},
		[setPage]
	);

	useEffect(() => {
		const observer = new IntersectionObserver(observerCallback, {
			root: null,
			rootMargin: '80px',
			threshold: 1,
		});
		if (loader.current && hasNext) {
			observer.observe(loader.current);
		}

		return () => observer.disconnect();
	}, [observerCallback, hasNext]);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		try {
			let dataToSet = [];
			let totalToSet = 0;

			if (query) {
				dataToSet = await fetchProductsByQuery(
					query,
					lang,
					sortValue,
					sortOrder
				);
				totalToSet = dataToSet.length;
			} else {
				for (let i = 1; i <= page; i++) {
					let response;

					if (category && sub_category) {
						response = await fetchProductBySubCategorie(
							lang,
							i,
							sortValue,
							sortOrder,
							category,
							sub_category
						);
					} else if (category) {
						response = await fetchgetProductsByCategorie(
							lang,
							sortValue,
							sortOrder,
							i,
							category
						);
					} else {
						response = await fetchProducts(lang, sortValue, sortOrder, i);
					}

					dataToSet = [...dataToSet, ...response.data];
					totalToSet = response.total;
				}

				if (category) {
					const activeTabIndex =
						categories.findIndex(el => el.id === category) + 1;

					setActiveTab(activeTabIndex);
				}
			}

			setRenderList(dataToSet);
			setTotal(totalToSet);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categories, category, page, sub_category, sortValue, sortOrder]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		if (!categoriesList) return;

		const dataCategory = categoriesList.map(item => ({
			title: item.attributes.title,
			id: item.attributes.uid,
			subCategories: item.attributes.sub_categories.data,
			goods: item.attributes.goods.data,
		}));

		const filteredData = dataCategory.filter(item => item.goods.length > 0);

		const categoriesArr = filteredData.reduce((acc, item) => {
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

	const toggleSort = value => {
		setSortValue(value);
		setSortOrder(prevOrder =>
			prevOrder === sortOrders[0] ? sortOrders[1] : sortOrders[0]
		);
	};

	//УДАЛИТЬ ПОСЛЕ НАПОЛНЕНИЯ АНГЛ КАТАЛОГА!!!!!
	//==================================================

	const pathname = usePathname();

	const redirectedPathName = locale => {
		if (!pathname) return '/';
		const segments = pathname.split('/');
		segments[1] = locale;

		return segments.join('/');
	};

	if (lang === 'en')
		return (
			<SectionWrapper>
				<Text>
					Certainly, here is a refined version of the text: We sincerely
					apologize for the inconvenience. At present, our catalog is
					exclusively available in Hebrew. We are diligently working on curating
					content for the English version to accommodate our diverse clientele.
					Your understanding and patience are greatly appreciated during this
					process. In the interim, should you wish to explore our offerings in a
					different language, please let us know. We are committed to providing
					you with the best possible service.
				</Text>

				<Center>
					<Flex
						as={'ul'}
						mt={'32px'}
						gap={'32px'}
						flexDir={{ base: 'column', md: ' row' }}
					>
						<Box as="li" borderBottom={'1px solid white'}>
							<Link href={redirectedPathName('he')}>
								Change language to Hebrew
							</Link>
						</Box>
						<Box as="li" borderBottom={'1px solid white'}>
							<Link href={'/'}>Return to the home page</Link>
						</Box>
					</Flex>
				</Center>
			</SectionWrapper>
		);

	if (lang === 'he')
		//============================================================================
		return (
			<SectionWrapper
				heading={heading}
				bg={'linear-gradient(to right, #434343 0%, black 100%)'}
				position={'relative'}
			>
				<MobileFilterMenu
					category={category}
					categories={categories}
					setCategory={setCategory}
					setSub_category={setSub_category}
					setPage={setPage}
					sub_category={sub_category}
					dictionary={dictionary}
					lang={lang}
					refMobFilter
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
								setQuery(null);
							}}
						>
							{dictionary.catalogPage.menu.all}
						</Tab>

						{categories &&
							categories.map(({ id, title, subCategories }) => (
								<Flex key={id} mx={'12px'}>
									<Tab
										px={0}
										_selected={{ color: '#a28445' }}
										color={'white'}
										fontSize={'18px'}
										fontWeight={'500'}
										onClick={() => {
											setCategory(id),
												category !== id && setSub_category(null),
												setPage(1);
											setQuery(null);
										}}
									>
										<CategoryMenu
											id={id}
											title={title}
											subCategories={subCategories}
											setCategory={setCategory}
											setSub_category={setSub_category}
											setPage={setPage}
											sub_category={sub_category}
											category={category}
											dictionary={dictionary}
										/>
									</Tab>
								</Flex>
							))}
					</TabList>

					<SortMenu
						sortValues={sortValues}
						toggleSort={toggleSort}
						sortOrder={sortOrder}
						sortValue={sortValue}
						dictionary={dictionary}
						lang={lang}
					/>

					<TabPanels px={'0'}>
						<TabPanel key={'All'} px={'0'} py={'0'}>
							{isLoading && page < 2 ? (
								<SkeletotonClientProductGrid />
							) : (
								<ProductList
									list={renderList}
									favorites={favorites}
									lang={lang}
									isLoading={isLoading}
								/>
							)}
						</TabPanel>
						{categories.map(({ id }) => (
							<TabPanel key={id} px={'0'} py={'0'}>
								{isLoading && page < 2 ? (
									<SkeletotonClientProductGrid />
								) : (
									<ProductList
										list={renderList}
										favorites={favorites}
										lang={lang}
										isLoading={isLoading}
									/>
								)}
							</TabPanel>
						))}
					</TabPanels>
					{hasNext && <div ref={loader} />}
				</Tabs>
				{isLoading && <SkeletotonClientProductGrid />}
				<ScrollToTopButton />
			</SectionWrapper>
		);
};

export default ProductsGrid;
