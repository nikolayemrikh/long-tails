import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { gql } from '@apollo/client';
import { apolloClient } from '../apollo-client';
import { ResponseData } from './api/tail';

const fetchTail = async (tail: string) => {
  const { data } = await apolloClient.query<ResponseData>({
    query: gql`
      query ($tail: String!) {
        getTailId(tail: $tail) {
          json_id
          title
          description
        }
      }
    `,
    variables: {
      tail
    }
  });
  return data;
}

interface Props {
  title: string;
  description: string;
}

const Home: NextPage<Props> = (props) => {
  const { title, description } = props;
  return (
    <main>
      <div>
        title: {title}
      </div>
      <div>
        description: {description}
      </div>
    </main>
  )
}

export default Home

export const getServerSideProps = async (context: any): Promise<{ props: Props }> => {
  const { tail } = context.params;
  const { title, description } = await fetchTail(tail)
  
  return {
    props: {
      title,
      description
    }
  }
}
