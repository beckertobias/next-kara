// import { getStaticPaths, getStaticProps } from './profile';
import { Button } from '../../../components/buttons';
import { Layout } from '../../../containers/layout';

export interface SettingsPageProps {
  id: string;
}

const SettingsPage = ({ id }: SettingsPageProps): React.ReactElement => {
  return (
    <Layout title={['settings', `Employer ${id}`]}>
      <h1>Settings Page for Employer {id}</h1>
      <Button href={`/employers/${id}/profile`}>To Profile</Button>
    </Layout>
  );
};

// export { getStaticPaths, getStaticProps };

export default SettingsPage;
