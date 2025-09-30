import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return <div ref={ref} {...props} />;
});

Card.displayName = "Card";

export { Card };