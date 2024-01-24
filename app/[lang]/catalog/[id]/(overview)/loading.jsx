import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import SkeletonSingleProduct from '@/app/ui/skeletons/SkeletonSingleProduct';

const LoadingProduct = () => {
	return (
		<SectionWrapper>
			<SkeletonSingleProduct />
		</SectionWrapper>
	);
};

export default LoadingProduct;
