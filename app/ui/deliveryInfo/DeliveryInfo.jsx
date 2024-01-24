import { Flex, Text } from '@chakra-ui/react';

import SectionWrapper from '../sectionWrapper/SectionWrapper';

const DeliveryInfo = ({ dictionary }) => {
	return (
		<SectionWrapper
			pt={0}
			py={0}
			headingAs="h4"
			heading={dictionary.singleProduct.pickup.title}
		>
			<Flex as={'ul'} flexDir={'column'} mt={2} gap={2}>
				<li>
					<Text fontSize={'small'} fontWeight={'600'}>
						{dictionary.singleProduct.pickup.self.split(':')[0]}
						<Text as={'span'} color={'#dfdede'} fontWeight={'400'}>
							:{dictionary.singleProduct.pickup.self.split(':')[1]}
						</Text>
					</Text>
				</li>

				{dictionary.singleProduct.pickup.zones.length > 0 &&
					dictionary.singleProduct.pickup.zones.map((zone, idx) => (
						<li key={idx}>
							<Text fontSize={'small'} fontWeight={'600'}>
								{zone.split(':')[0]}:
								<Text as={'span'} color={'#dfdede'} fontWeight={'400'}>
									{zone.split(':')[1]}
								</Text>
							</Text>
						</li>
					))}
				{dictionary.singleProduct.pickup.pss.length > 0 &&
					dictionary.singleProduct.pickup.pss.map((ps, idx) => (
						<li key={idx}>
							<Text fontSize={'small'} fontWeight={'600'}>
								{ps}
							</Text>
						</li>
					))}
			</Flex>
		</SectionWrapper>
	);
};

export default DeliveryInfo;
