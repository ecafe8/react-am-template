

export const isLocal = () => {
  return process.env.NODE_ENV !== 'production';
};


export const getQueryString = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) return r[2];
  return null;
};
