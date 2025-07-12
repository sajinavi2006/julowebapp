import { useEffect } from 'react';

import { useRDeleteDocuments } from 'repositories/merchant/application';

function useDeleteAllDocuments() {
  const { isLoading, mutateAsync: deleteDocuments } = useRDeleteDocuments();

  useEffect(() => {
    const unloadCallback = async (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      try {
        await deleteDocuments({});
      } catch (err) {
        return;
      }
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => {
      window.removeEventListener('beforeunload', unloadCallback);
    };
  }, [isLoading]);
}

export default useDeleteAllDocuments;
