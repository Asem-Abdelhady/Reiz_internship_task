import React, { Dispatch, SetStateAction } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useRouter } from "next/router";

interface IProps {
  numOfPages: number;
  currPage: number;
  setStart: Dispatch<SetStateAction<number>>;
  setCurrentList: Dispatch<SetStateAction<CountryResponse[]>>;
  countriesData: CountryResponse[];
}
export default function CustomPagination(props: IProps) {
  const router = useRouter();
  console.log("Here");

  // Scroll to top when page changes
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace(`/${String(value)}`, undefined, { shallow: true });
    const start_n = (value - 1) * 10;
    props.setStart((value - 1) * 10);
    props.setCurrentList(props.countriesData.slice(start_n, start_n + 10));
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: 10,
      }}
    >
      <Pagination
        onChange={handleChange}
        page={props.currPage}
        count={props.numOfPages}
        color={"primary"}
        hideNextButton
        hidePrevButton
      />
    </div>
  );
}
