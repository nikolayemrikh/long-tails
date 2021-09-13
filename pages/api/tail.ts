// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { gql } from '@apollo/client';
import { apolloClient } from '../../apollo-client';
import path from 'path';
import { readFile } from 'fs/promises';

interface RequestData {
  input: {
    tail: string;
  }
}

interface ErrorResponseData {
  message: string;
}

export interface ResponseData extends Omit<TailData, 'id'>{
  json_id: number;
}

interface JsonIdsResponseData {
  long_tails: {
    json_id: number;
  }[];
}

interface TailData {
  id: number;
  title: string;
  description: string;
}

const queryJsonIds = gql`
query ($tail: String!) {
  long_tails(where: {tail: {_eq: $tail}}) {
    json_id
  }
}
`;

const getTailData = async (json_id: number): Promise<TailData | undefined> => {
  const json = await readFile(path.join(process.cwd(), 'tails.json'), 'utf-8');
  const titles = JSON.parse(json) as TailData[];

  return titles.find(({ id }) => id === json_id);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorResponseData>
) {
  const { tail } = (req.body as RequestData).input;

  const { long_tails: tails } = (await apolloClient.query<JsonIdsResponseData>({
    query: queryJsonIds,
    variables: {
      tail
    }
  })).data;

  if (!tails.length) {
    return res.status(404).json({ message: 'Not found' });
  }

  const { json_id } = tails[0];

  let tailData: TailData;
  try {
    tailData = await getTailData(json_id);
  } catch (err: unknown) {
    return res.status(400).json({ message: err instanceof Error ? err.message : 'Internal server error' });
  }

  const { title, description } = tailData;

  console.log(title);
  
  res.status(200).json({
    json_id,
    title,
    description,
  })
}
