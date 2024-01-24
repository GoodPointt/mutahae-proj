'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Box, List, ListItem, VisuallyHiddenInput } from '@chakra-ui/react';

import { createCookie } from '@/app/lib/actions';
import { i18n } from '@/app/lib/locales/i18n.config';

import SubmitButton from '../../submitButton/SubmitButton';

const LocaleSwitcher = () => {
	const pathName = usePathname();
	const [path, setPath] = useState(pathName);

	useEffect(() => {
		setPath(pathName);
	}, [pathName]);

	// eslint-disable-next-line no-unused-vars
	const [state, dispatch] = useFormState(createCookie, undefined);

	return (
		<List display={'flex'}>
			<ListItem>
				<form action={dispatch}>
					<VisuallyHiddenInput name={'lang'} defaultValue={i18n.locales[0]} />
					<VisuallyHiddenInput
						name={'path'}
						value={path}
						onChange={e => setPath(e.target.value)}
					/>
					<SubmitButton
						bgColor={'transparent'}
						px={'2px'}
						hover={'transparent'}
						dis={path.includes(i18n.locales[0])}
					>
						<Box
							display={'block'}
							pos={'relative'}
							w={'40px'}
							h={'30px'}
							overflow={'hidden'}
							borderRadius={'10px'}
						>
							<Image
								src={'/gb.svg'}
								alt={'product image'}
								fill
								style={{
									display: 'block',
									height: '100%',
									maxWidth: '100%',
									objectFit: 'cover',
								}}
							/>
						</Box>
					</SubmitButton>
				</form>
			</ListItem>
			<ListItem>
				<form action={dispatch}>
					<VisuallyHiddenInput name={'lang'} defaultValue={i18n.locales[1]} />

					<VisuallyHiddenInput
						name={'path'}
						onChange={e => setPath(e.target.value)}
						value={path}
					/>
					<SubmitButton
						bgColor={'transparent'}
						hover={'transparent'}
						dis={path.includes(i18n.locales[1])}
					>
						<Box
							display={'block'}
							pos={'relative'}
							w={'40px'}
							h={'30px'}
							overflow={'hidden'}
							borderRadius={'10px'}
						>
							<Image
								src={'/he.svg'}
								alt={'product image'}
								fill
								style={{
									display: 'block',
									height: '100%',
									maxWidth: '100%',
									objectFit: 'cover',
								}}
							/>
						</Box>
					</SubmitButton>
				</form>
			</ListItem>
		</List>
	);
};
export default LocaleSwitcher;
