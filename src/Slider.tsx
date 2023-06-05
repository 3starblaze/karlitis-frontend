import { Slider } from "antd";
import { useEffect, useState } from "react";

interface RangeProps {
	value: number;
	callback: (val: number) => void;
}

function RangeSlider(props: RangeProps) {
	const [value, setValue] = useState<number>(50_000);

	useEffect(() => {
    setValue(props.value);
  }, [props.value]);

	return (<Slider
				min={0}
				max={450_000}
				step={1}

				value={value}

				onChange={(val) => setValue(val)}
				onAfterChange={(val) => props.callback(val)}
			/>);
}

export default RangeSlider;