import Header from '../Header';
import { PageProps } from './type';

const Page = (props: PageProps) => {
  const { useHeader, children, style, ...resProps } = props;

  return (
    <div style={{ padding: '0px', ...(style && style) }} {...resProps}>
      {useHeader && <Header />}
      {children}
    </div>
  );
};

export default Page;
