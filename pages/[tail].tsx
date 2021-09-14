import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
// import styles from '../styles/Home.module.css'
import { gql, useQuery } from '@apollo/client';
import { apolloClient } from '../apollo-client';
import { ResponseData } from './api/tail';
import Tail from '../components/Tail'

interface GetTailData {
  getTailId: ResponseData
}

const QUERY = gql`
query ($tail: String!) {
  getTailId(tail: $tail) {
    json_id
    title
    description
  }
}
`;

const fetchTail = async (tail: string) => {
  const { data } = await apolloClient.query<GetTailData>({
    query: QUERY,
    variables: {
      tail
    },
    fetchPolicy: 'network-only'
  });
  return data;
}

interface Props {
  tailData?: {
    title: string;
    description: string;
  }
  error?: string;
}

const Home: NextPage<Props> = (props) => {
  const router = useRouter();
  const { tail } = router.query;
  const { tailData, error } = props;

  const { data: clientData, error: clientError } = useQuery<GetTailData>(QUERY, {
    variables: {
      tail,
    },
    fetchPolicy: 'network-only',
    client: apolloClient,
    ssr: false
  });

  return (
    <main>
      {/* {loading && <div>loading</div>}
      {(!loading && data) && <>
          <div>
            title: {data.getTailId.title}
          </div>
          <div>
            description: {data.getTailId.description}
          </div>
      </>}
      {(!loading && error) && <div>
        error occured: {error.message}
      </div>} */}
      {(tailData && !clientData) && <Tail title={tailData.title} description={tailData.description} />}
      {(clientData && !clientError) && <Tail title={clientData.getTailId.title} description={clientData.getTailId.description} />}
      {clientError && <div>error occured: {clientError}</div>}
    </main>
  )
}

export default Home

export const getServerSideProps = async (context: any): Promise<{ props: Props }> => {  
  const { tail } = context.params;
  try {
    return {
      props: {
        tailData: (await fetchTail(tail)).getTailId,
      }
    }
  } catch (error) {
    return {
      props: {
        error: error instanceof Error ? error.message : 'Not found'
      }
    }
  }
}
