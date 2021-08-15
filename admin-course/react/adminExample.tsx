/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react'
// @ts-ignore
import { Layout, PageBlock } from 'vtex.styleguide'

const AdminExample: FC = () => {
  return (
    <Layout>
      <PageBlock variation="full" title="Título" subTitle="Alguma explicação">
        <h1>Hello, world!!</h1>
      </PageBlock>
    </Layout>
  )
}

export default AdminExample
