import { usePrivy } from "@privy-io/react-auth";

import { Expandable } from "./ui/expandable";
import { Badge } from "./ui/badge";

const PrivyUserObject = () => {
  const { user } = usePrivy();
  return (
    <Expandable
      title="Privy user object"
      className={["card", "card-padding", "max-h-500", "overflow-y-auto"].join(
        " "
      )}
    >
      <div className="row-between-start">
        <div>
          <h3 className="card-title">
            Privy user object{" "}
            <Badge>
              <code>@/components/privy-user-object.tsx</code>
            </Badge>
          </h3>
        </div>
      </div>
      <pre className={["text-sm", "muted"].join(" ")}>
        {JSON.stringify(user, null, 2)}
      </pre>
    </Expandable>
  );
};

export default PrivyUserObject;
