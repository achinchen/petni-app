import Pet from '~/features/pet';
import Layout from '~/components/common/Layout';

export default function ThemeColor() {
  return (
    <Layout withMobileHeader={false}>
      <Pet />
    </Layout>
  );
}
