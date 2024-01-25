import React from 'react';

import LoginForm from '@/app/ui/auth/LoginForm';

import { getDictionary } from '@/app/lib/locales/dictionary';

const LoginPage = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);

	return <LoginForm lang={lang} dictionary={dictionary} />;
};

export default LoginPage;
