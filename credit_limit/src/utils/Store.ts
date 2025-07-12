const store = {
  /* keyobject can have various of key and value datatype */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: (keyObject: Record<any, any> | string, value?: any) => {
    if (typeof value !== 'string') value = JSON.stringify(value);

    if (typeof keyObject === 'object') {
      Object.keys(keyObject).forEach(function (key) {
        sessionStorage.setItem(key, keyObject[key]);
      });
    } else {
      sessionStorage.setItem(keyObject, value);
    }
  },
  /* keyobject can have various of key and value datatype */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setLocal: (keyObject: Record<any, any> | string, value?: any) => {
    if (typeof value !== 'string') value = JSON.stringify(value);

    if (typeof keyObject === 'object') {
      Object.keys(keyObject).forEach(function (key) {
        localStorage.setItem(key, keyObject[key]);
      });
    } else {
      localStorage.setItem(keyObject, value);
    }
  },

  get: (key: string) => {
    if (
      sessionStorage.getItem(key) == null ||
      sessionStorage.getItem(key) == 'null' ||
      sessionStorage.getItem(key) == undefined ||
      sessionStorage.getItem(key) == 'undefined'
    ) {
      return '';
    }
    return sessionStorage.getItem(key);
  },

  getLocal: (key: string) => {
    if (
      localStorage.getItem(key) == null ||
      localStorage.getItem(key) == 'null' ||
      localStorage.getItem(key) == undefined ||
      localStorage.getItem(key) == 'undefined'
    ) {
      return '';
    }
    return localStorage.getItem(key);
  },

  getParse: (key: string) => {
    if (
      sessionStorage.getItem(key) == null ||
      sessionStorage.getItem(key) == 'null' ||
      sessionStorage.getItem(key) == undefined ||
      sessionStorage.getItem(key) == 'undefined'
    ) {
      return '';
    }
    const temp = sessionStorage.getItem(key);

    if (!temp) return null;

    return JSON.parse(temp);
  },

  removeItem: (key: string) => {
    if (Array.isArray(key)) {
      return key.forEach((k) => sessionStorage.removeItem(k));
    }
    return sessionStorage.removeItem(key);
  },

  clearAllItem: (except?: string | string[]) => {
    if (except) {
      if (Array.isArray(except)) {
        except = [...new Set(except)];

        /* value from sessionStorage is various */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tempExcept: Record<any, any> = except.reduce(
          (prevValue, exceptKey) => {
            const loadedValue = sessionStorage.getItem(exceptKey);

            return {
              ...prevValue,
              ...(loadedValue && { [exceptKey]: loadedValue }),
            };
          },
          {},
        );

        sessionStorage.clear();

        return Object.entries(tempExcept).forEach(([key, value]) => {
          sessionStorage.setItem(key, value);
        });
      } else {
        const tempExcept = sessionStorage.getItem(except);
        sessionStorage.clear();

        if (!tempExcept) return;

        return sessionStorage.setItem(except, JSON.stringify(tempExcept));
      }
    } else {
      return sessionStorage.clear();
    }
  },
};

export default store;
