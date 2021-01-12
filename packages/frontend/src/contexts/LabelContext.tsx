import React, { useState, useEffect } from 'react';
import { Option } from '../components/SelectInput';

interface LabelContext {
  labels: Option[];
  actions: {
    refetch: () => Promise<void>;
  };
}

const initialContext = {
  actions: {
    refetch: async () => undefined,
  },
  labels: [],
};

export const labelContext = React.createContext<LabelContext>(initialContext);

export const LabelProvider: React.FC = ({ children }) => {
  const [labels, setLabels] = useState<Option[]>([]);

  const refetch = async () => {
    const labelRequest = await fetch('/api/label', {
      headers: {
        'content-type': 'application/json',
      },
    });
    const labelJson: Option[] = await labelRequest.json();
    setLabels(labelJson);
  };

  useEffect(() => {
    (async () => {
      await refetch();
    })();
  }, []);

  return (
    <labelContext.Provider
      value={{
        actions: {
          refetch,
        },
        labels,
      }}
    >
      {children}
    </labelContext.Provider>
  );
};
