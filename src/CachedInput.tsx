import { useState, useRef, useEffect } from "react";
import Input from "@material-ui/core/Input";

import { debounce } from "lodash";

export default function CachedInput(props) {
  const [val, setVal] = useState(props.value);

  //Debounce API call after onChange
  const parentOnChangeRef = useRef(null);
  useEffect(() => {
    const parentOnChange = (e) => {
      props.onChange(e);
    };
    parentOnChangeRef.current = debounce(parentOnChange, 500);
    return () => {
      parentOnChangeRef.current.flush();
    };
  }, [props]);

  return (
    <Input
      {...props}
      value={val}
      onChange={(e) => {
        setVal(e.target.value);
        parentOnChangeRef.current(e);
      }}
    ></Input>
  );
}
