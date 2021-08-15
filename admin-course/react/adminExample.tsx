/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react';
// @ts-ignore
import { Layout, PageBlock } from 'vtex.styleguide';
import { useQuery } from 'react-apollo';

import helloworld from './graphql/helloworld.graphql';

const AdminExample: FC = () => {
  const { data } = useQuery(helloworld);
  
  return (
    <Layout>
      <PageBlock variation="full" title="Título" subTitle="Alguma explicação">
        <h1>Hello, world!!</h1>
        <p>{data?.helloworld}</p>
      </PageBlock>
    </Layout>
  )
}

export default AdminExample;
