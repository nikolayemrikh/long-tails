import { memo } from "react";

interface Props {
  title: string;
  description: string;
}

const Tail: React.FC<Props> = (props: Props) => {
  const { title, description } = props;
  return <>
    <div>
    title: {title}
    </div>
    <div>
      description: {description}
    </div>
  </>;
}

export default memo(Tail);