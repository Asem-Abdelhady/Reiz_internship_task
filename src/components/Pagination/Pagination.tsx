import React, { Dispatch, SetStateAction } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useRouter } from "next/router";

interface IProps {
  numOfPages: number;
  currPage: number;
}
export default function CustomPagination(props: IProps) {
  const router = useRouter();

  // Scroll to top when page changes
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace(`/${String(value)}`);
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
