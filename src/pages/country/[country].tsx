import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BASE_URL } from "../../../config/config";

export default function Country({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("Data is: ", data);

  return <div>{data[0].region}</div>;
}

export const getServerSideProps: GetServerSideProps<{
  data: CountryNameResponse[];
}> = async (context) => {
  let country = context.params?.country;
  const URL = `${BASE_URL}/name/${country}`;

  const res = await axios.get<CountryNameResponse[]>(URL);
  const data = res.data;
  return {
    props: {
      data,
    },
  };
};
