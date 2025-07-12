import utils from 'utils';

export const redirectPage = (props) => {
  const status = utils.store.get('appStatus');
  const partner = utils.store.get('partner');
  if (status > 100) {
    props.history.push(`/${partner}/home`);
  }
};
