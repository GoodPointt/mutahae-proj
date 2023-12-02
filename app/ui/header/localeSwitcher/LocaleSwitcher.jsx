'use client';

import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';
import { Box, List, ListItem, VisuallyHiddenInput } from '@chakra-ui/react';
import { useFormState } from 'react-dom';
import { createCookie } from '@/app/lib/actions';
import SubmitButton from '../../submitButton/SubmitButton';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const LocaleSwitcher = () => {
	const pathName = usePathname();
	const [path, setPath] = useState(pathName);
	const [state, dispatch] = useFormState(createCookie, undefined);

	useEffect(() => {
		setPath(pathName);
	}, [pathName]);

	const renderSubmitButton = (lang, src) => (
		<ListItem key={lang}>
			<form action={dispatch}>
				<VisuallyHiddenInput
					name={'lang'}
					defaultValue={i18n.locales[lang]}
				/>
				<VisuallyHiddenInput
					name={'path'}
					value={path}
					onChange={(e) => setPath(e.target.value)}
				/>
				<SubmitButton
					bgColor={'transparent'}
					px={'8px'}
					hover={'transparent'}>
					<Box
						display={'block'}
						pos={'relative'}
						w={'40px'}
						h={'30px'}
						overflow={'hidden'}
						borderRadius={'10px'}>
						<Image
							src={src}
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
	);

	return (
		<List display={'flex'}>
			{[0, 1].map((lang) =>
				renderSubmitButton(lang, lang === 0 ? '/gb.svg' : '/he.svg'),
			)}
		</List>
	);
};

export default LocaleSwitcher;
