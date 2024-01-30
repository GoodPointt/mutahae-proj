import ClientSideRedirection from '@/app/ui/auth/ClientSideRedirection';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';

import { getDictionary } from '@/app/lib/locales/dictionary';

const RedirectPage = async ({ params: { provider, lang } }) => {
	const dictionary = await getDictionary(lang);

	return (
		<SectionWrapper style={{ height: '100dvh' }}>
			<ClientSideRedirection
				lang={lang}
				dictionary={dictionary}
				provider={provider}
			/>
		</SectionWrapper>
	);
};

export default RedirectPage;
