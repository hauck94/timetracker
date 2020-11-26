import React, { useState, useContext, useEffect } from "react";
import { Option } from "../components/SelectInput";

interface LabelContext {
  labels: Option[];
  actions: {
    refetch: () => Promise<void>;
  };
}

const initialContext = {
  labels: [] as Option[],
  actions: {
    refetch: async () => {},
  },
};

export const labelContext = React.createContext<LabelContext>(initialContext);

export const LabelProvider: React.FC = ({ children }) => {
  const [labels, setLabels] = useState<Option[]>([]);

  const refetch = async () => {
    const labelRequest = await fetch("/api/label", {
      headers: {
        "content-type": "application/json",
      },
    });
    const labelJson = await labelRequest.json();
    setLabels(labelJson.data as Option[]);
  };

  useEffect(() => {
    (async function () {
      await refetch();
    })();
  }, []);

  return (
    <labelContext.Provider
      value={{
        labels,
        actions: {
          refetch,
        },
      }}
    >
      {children}
    </labelContext.Provider>
  );
};
