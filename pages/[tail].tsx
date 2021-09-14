import type {NextPage, GetServerSideProps} from 'next';
import Link from 'next/link';
import {gql} from '@apollo/client';
import {apolloClient} from '../apollo-client';
import {SuccessResponseData} from './api/tail';

interface QueryResult {
  /** getTailId action response */
  getTailId: SuccessResponseData;
}

interface Props {
  tailData?: {
    title: string;
    description: string;
  };
  error?: string;
}

const Home: NextPage<Props> = (props: Props) => {
  const {tailData, error} = props;

  return (
    <main>
      {error ? (
        <div>{error}</div>
      ) : (
        <div>
          <div>title: {tailData.title}</div>
          <div>description: {tailData.description}</div>
        </div>
      )}
      <br />

      <div>
        <div>
          <Link href="/best-hello-ever">
            <a>best-hello-ever</a>
          </Link>
        </div>
        <div>
          <Link href="/best-hello-world-ever">
            <a>best-hello-world-ever</a>
          </Link>
        </div>
        <div>
          <Link href="/best-world-ever">
            <a>best-world-ever</a>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;

interface QueryVariables {
  tail: string;
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

const fetchTail = async (tail: string): Promise<QueryResult> => {
  const {data} = await apolloClient.query<QueryResult, QueryVariables>({
    query: QUERY,
    variables: {
      tail,
    },
    fetchPolicy: 'network-only',
  });
  return data;
};

export const getServerSideProps: GetServerSideProps<Props> = async (context): Promise<{props: Props}> => {
  let {tail} = context.params;
  if (Array.isArray(tail)) {
    tail = tail[0];
  }
  try {
    const {getTailId: tailData} = await fetchTail(tail);
    return {
      props: {
        tailData,
      },
    };
  } catch (error: unknown) {
    return {
      props: {
        error: error instanceof Error ? error.message : 'Unexpected error happened',
      },
    };
  }
};
