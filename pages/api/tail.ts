import type {NextApiHandler} from 'next';
import {gql} from '@apollo/client';
import {apolloClient} from '../../apollo-client';
import path from 'path';
import {promises} from 'fs';
const {readFile} = promises;

/** Item inside of tails.json */
export interface TailJsonData {
  id: number;
  title: string;
  description: string;
}

/** Data returned from query to hasura for json_id in long_tails */
interface TailRequestData {
  input: {
    tail: string;
  };
}

interface JsonIdsResponseData {
  long_tails: {
    json_id: number;
  }[];
}

interface ErrorResponseData {
  message: string;
}

export interface SuccessResponseData extends Omit<TailJsonData, 'id'> {
  json_id: number;
}

export type ResponseData = ErrorResponseData | SuccessResponseData;

const queryJsonIds = gql`
  query ($tail: String!) {
    long_tails(where: {tail: {_eq: $tail}}) {
      json_id
    }
  }
`;

/**
 * Read file tails.json, parse it, find needed item and return
 */
const getTailData = async (json_id: number): Promise<TailJsonData | undefined> => {
  const json = await readFile(path.join(process.cwd(), 'tails.json'), 'utf-8');
  const titles = JSON.parse(json) as TailJsonData[];

  return titles.find(({id}) => id === json_id);
};

/**
 * Handler for action getTailId in hasura
 * Should query json_id from hasura, read tails.json, find item with same id and respond with its data
 */
const handler: NextApiHandler<ResponseData> = async (req, res) => {
  const {tail} = (req.body as TailRequestData).input;

  const {long_tails: tails} = (
    await apolloClient.query<JsonIdsResponseData>({
      query: queryJsonIds,
      variables: {
        tail,
      },
    })
  ).data;

  if (!tails.length) {
    return res.status(404).json({message: 'Not found'});
  }

  const {json_id} = tails[0];

  let tailData: TailJsonData;
  try {
    tailData = await getTailData(json_id);
  } catch (err: unknown) {
    return res.status(400).json({message: err instanceof Error ? err.message : 'Internal server error'});
  }

  const {title, description} = tailData;

  res.status(200).json({
    json_id,
    title,
    description,
  });
};

export default handler;
